import {ContentChildren, Directive, ElementRef, EventEmitter, Input, Output, QueryList} from '@angular/core';
import {ListboxOptionDirective} from "./listbox-option.directive";

@Directive({
  selector: '[appListbox]'
})
export class ListboxDirective {

  constructor(private el: ElementRef) { }

  @ContentChildren(ListboxOptionDirective, {descendants: true}) _options: QueryList<ListboxOptionDirective>;

  @Input() selected: ListboxOptionDirective;
  @Input() selectedIndex: number;

}
