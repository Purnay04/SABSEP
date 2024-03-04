import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type BreadcrumbItem = {
  name: string,
  url: string
}

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  breadcrumbsItems$: BehaviorSubject<Set<BreadcrumbItem>>;
  constructor() {
    this.breadcrumbsItems$ = new BehaviorSubject<Set<BreadcrumbItem>>(new Set<BreadcrumbItem>());
  }

  getCurrent(): Set<BreadcrumbItem> {
    return this.breadcrumbsItems$.value;
  }

  addItem(item: BreadcrumbItem) {
    var currentItems = this.getCurrent();
    currentItems.add(item);
    this.breadcrumbsItems$.next(currentItems);
  }

  popItem() {
    var currentItems = Array.from(this.getCurrent());
    this.breadcrumbsItems$.next(currentItems.length > 0 ? new Set(currentItems.slice(0, currentItems.length)) : new Set([]));
  }

  clickEvent(clikedItem: BreadcrumbItem){
    var currentItems : BreadcrumbItem[] = Array.from(this.getCurrent());
    var clickedItemIdx = currentItems.findIndex(item => item.name === clikedItem.name);
    if(clickedItemIdx !== -1)
      this.breadcrumbsItems$.next(new Set(currentItems.slice(0, clickedItemIdx + 1)));
    else
      this.breadcrumbsItems$.next(new Set(currentItems.length > 0 ? [currentItems[0]] : []));
  }

  clearBreadcrumbs() {
    this.breadcrumbsItems$.next(new Set<BreadcrumbItem>());
  }
}
