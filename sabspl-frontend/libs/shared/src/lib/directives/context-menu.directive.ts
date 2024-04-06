import { Directive, ElementRef, HostListener, Input, Renderer2 } from "@angular/core";

export type ContextMenuMeta = {
  menuName: string,
  menuClassList: string[],
  menuItems: ContextMenuItem[]
}

export type ContextMenuItem = {
  label: string,
  click: Function
}

@Directive({
  standalone: true,
  selector: '[contextMenu]'
})
export class ContextMenuDirective {
  @Input({required: true}) contextMenuMeta: ContextMenuMeta | undefined;

  private menuElement!: HTMLDivElement;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2) {
  }

  ngOnInit() {
    this.menuElement = this.createContextMenu();
     this.menuElement.innerHTML = this.contextMenuMeta?.menuItems
        .map(item => `<span  class="block px-4 py-2 text-sm text-gray-700 cursor-pointer" id="${item.label}" (click)="${item.click}('${item.label}')">${item.label}</span>`)
        .join('') || '';
  }

  private createContextMenu(): HTMLDivElement {
    const contextMenu = document.createElement('div');
    contextMenu.classList.add("hidden",...this.contextMenuMeta?.menuClassList || []);
    document.body.appendChild(contextMenu);
    return contextMenu;
  }

  private positionMenu(): void {
    const srcElementBoundingRect = this.el.nativeElement.getBoundingClientRect();
    this.menuElement.style.left = `${srcElementBoundingRect.x - (this.menuElement.getBoundingClientRect().width * 0.80)}px`;
    this.menuElement.style.top = `${(srcElementBoundingRect.y + srcElementBoundingRect.height)}px`;
  }

  @HostListener('keydown', ['$event'])
  onDocumentKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onContextMenu(event);
    }
  }

  @HostListener('dblclick', ['$event'])
  @HostListener('mousedown', ['$event'])
  onContextMenu(event: MouseEvent | KeyboardEvent): void {
    if(this.menuElement.style.display === 'block') {
      this.renderer.addClass(this.menuElement, "hidden");
      document.removeEventListener('mousedown', this.closeContextMenu);
    }
    else {
      this.renderer.removeClass(this.menuElement, "hidden");
      this.renderer.addClass(this.menuElement, "block");
      this.positionMenu();
      document.addEventListener('mousedown', this.closeContextMenu);
      // setTimeout(() => {
      //   document.addEventListener('mousedown', this.closeContextMenu);
      // });
    }
  }

  private closeContextMenu = (event: MouseEvent): void => {
    if((event.target as Node) !== undefined && !this.menuElement.contains(event.target as Node)) {
      this.renderer.addClass(this.menuElement, "hidden");
      document.removeEventListener('mousedown', this.closeContextMenu);
    }
  }
}