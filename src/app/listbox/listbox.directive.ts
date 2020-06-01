import {
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren,
  AfterViewInit
} from '@angular/core';
import {ListboxOptionDirective} from "./listbox-option.directive";
import {ListKeyManager} from "@angular/cdk/a11y";

@Directive({
  selector: '[appListbox]',
  exportAs: 'cdkListbox'
})
export class ListboxDirective {

  constructor(private el: ElementRef) { }

  @ViewChildren(ListboxOptionDirective) _options: QueryList<ListboxOptionDirective>;

  @Input() selectedOption: ListboxOptionDirective;
  @Input() selectedIndex: number;

  private _listKeyManager: ListKeyManager<ListboxOptionDirective>;

  ngAfterViewInit() {
    this._listKeyManager = new ListKeyManager<ListboxOptionDirective>(this._options)
                               .withWrap().withVerticalOrientation(true);
  }

  onSelectedOptionChange(option: ListboxOptionDirective) {
    this.selectedOption = this.selectedOption === option ? undefined : option;
    this.selectedIndex = this.selectedOption === option ? -1 : this._options.toArray().indexOf(option);
  }
}
