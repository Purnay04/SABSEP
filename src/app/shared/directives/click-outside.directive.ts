import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from "@angular/core";

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective {
  constructor(private ele: ElementRef) { }

  @Input({required: true}) ignoreElements! : Array<HTMLElement>;
  @Output() clickOutside = new EventEmitter<MouseEvent>();

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement) {
    if(!targetElement){
      return
    }
    const clickInside = this.ele.nativeElement.contains(targetElement);
    if(!clickInside && !this.ignoreElements.some(LookChildsOfElement => this.checkIsItUnderIgnoreElement(targetElement, LookChildsOfElement))) {
      this.clickOutside.emit(event);
    }
  }

  checkIsItUnderIgnoreElement(targetElement: HTMLElement, LookChildsOfElement: HTMLElement) {
    return LookChildsOfElement.contains(targetElement);
  }
}