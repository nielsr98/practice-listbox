import {
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren,
  AfterViewInit, HostListener, HostBinding
} from '@angular/core';
import {ListboxOptionDirective} from "./listbox-option.directive";
import {ListKeyManager} from "@angular/cdk/a11y";

let _uniqueIdCounter = 0;

@Directive({
  selector: '[appListbox]',
  exportAs: 'cdkListbox',
  host: {
    role: 'listbox',
    tabindex: '0'
  }
})
export class ListboxDirective {

  constructor(private el: ElementRef) { }

  @ContentChildren(ListboxOptionDirective) _options: QueryList<ListboxOptionDirective>;
  private optionsNativeElements = [];

  private _listKeyManager: ListKeyManager<ListboxOptionDirective>;

  @Input() selectedOption: ListboxOptionDirective;
  @Input() selectedIndex: number;

  // @HostBinding('attr.aria-role') role = 'listbox';
  // @HostBinding('attr.tabindex') tabindex = 0;

  @HostListener('click', ['$event']) onClickUpdateSelectedOption($event) {
    console.log($event);
    let selectedOption: ListboxOptionDirective;
    this._options.toArray().forEach(option => {
      if (option.id === $event.target.id) {
        selectedOption = option;
      }
    });
    this.updateSelectedOption(selectedOption);
  }

  ngAfterViewInit() {
    this._options.forEach(option => {
      option.setOptionId(`cdk-option-${_uniqueIdCounter++}`);
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
    if (this.selectedOption === option) {
      this.highlight(option, null);
      this.selectedOption.selected = false;
      this.selectedOption = undefined;
      this.selectedIndex = -1;
    } else {
      if (this.selectedOption) {
        this.highlight(this.selectedOption, null);
      }
      this.highlight(option, 'lightblue');
      this.selectedOption = option;
      this.selectedOption.selected = true;
      this.selectedIndex = this._options.toArray().indexOf(option);
    }
  }

  focus(): void {
    this.el.nativeElement.focus();
  }

  blur(): void {
    this.el.nativeElement.blur();
  }

  highlight(option: ListboxOptionDirective, color: string): void {
    option.getNativeElement().nativeElement.style.backgroundColor = color;
  }

  getItems(): ListboxOptionDirective[] {
    return this._options.toArray() || [];
  }
}
