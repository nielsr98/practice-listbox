import {Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';
import {Highlightable, ListKeyManagerOption} from '@angular/cdk/a11y/';

@Directive({
  selector: '[appListboxOption]',
  exportAs: 'cdkListboxOption',
  host: {
    role: 'option',
    '[attr.aria-selected]': '_selected',
    '[attr.aria-disabled]': '_disabled',
    '[attr.id]': '_id',
    '[attr.tabindex]': '_tabIndex'
  }
})
export class ListboxOptionDirective implements ListKeyManagerOption, Highlightable {

  constructor(private el: ElementRef) { }

  @Input()
  get selected(): boolean {
    return this._selected
  }
  set selected(isSelected: boolean) {
    this._selected = isSelected;
  }

  @Input() _id: string;

  @Input()
  get tabindex(): number {
    return this._tabIndex;
  }

  set tabindex(index: number) {
    this._tabIndex = index;
  }

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(isDisabled: boolean) {
    this._disabled = isDisabled;
    if (isDisabled) {
      this.tabindex = null;
    } else {
      this.tabindex = -1;
    }
  }

  @Input()
  get active(): boolean {
    return this._active;
  }
  set active(isActive: boolean) {
    this._active = isActive;
  }

  private _selected: boolean = null;
  private _disabled: boolean = false;
  private _tabIndex: number = null;
  private _active: boolean = false;

  getNativeElement(): ElementRef {
    return this.el;
  }

  setOptionId(optionId: string) {
    this._id = optionId;
  }

  getOptionId(): string {
    return this._id;
  }

  getLabel(): string {
    return this.el.nativeElement.textContent;
  }

  setActiveStyles(): void {
    this._active = true;
  }

  setInactiveStyles(): void {
    this._active = false;
  }

}
