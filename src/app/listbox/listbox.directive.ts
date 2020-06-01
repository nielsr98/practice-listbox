import {
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren,
  AfterViewInit, HostListener
} from '@angular/core';
import {ListboxOptionDirective} from "./listbox-option.directive";
import {ListKeyManager} from "@angular/cdk/a11y";

@Directive({
  selector: '[appListbox]',
  exportAs: 'cdkListbox'
})
export class ListboxDirective {

  constructor(private el: ElementRef) { }

  @ContentChildren(ListboxOptionDirective) _options: QueryList<ListboxOptionDirective>;
  optionsNativeElements = [];

  @Input() selectedOption: ListboxOptionDirective;
  @Input() selectedIndex: number;

  @HostListener('click', ['$event']) onClickUpdateSelectedOption($event) {
    const selectedOptionIndex = this.optionsNativeElements.indexOf($event.target);
    const selectedOption = this._options.toArray()[selectedOptionIndex];
    this.updateSelectedOption(selectedOption);
  }

  private _listKeyManager: ListKeyManager<ListboxOptionDirective>;

  ngAfterViewInit() {
    this._options.forEach(option => {
      this.optionsNativeElements.push(option.getNativeElement().nativeElement);
    });

    this._listKeyManager = new ListKeyManager<ListboxOptionDirective>(this._options)
                               .withWrap().withVerticalOrientation(true);
  }

  get isFocused(): boolean {
    return this.el.nativeElement === document.activeElement;
  }

  get tabIndex(): number {
    return this.el.nativeElement.tabIndex;
  }

  updateSelectedOption(option: ListboxOptionDirective) {
    this.selectedOption = this.selectedOption === option ? undefined : option;
    this.selectedIndex = this.selectedOption === option ? -1 : this._options.toArray().indexOf(option);
  }

  focus(): void {
    this.el.nativeElement.focus();
  }

  blur(): void {
    this.el.nativeElement.blur();
  }

  highlight(color: string): void {
    this.el.nativeElement.style.backgroundColor = color;
  }

  getItems(): ListboxOptionDirective[] {
    return this._options.toArray() || [];
  }
}
