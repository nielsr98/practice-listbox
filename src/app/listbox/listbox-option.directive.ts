import {Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';
import {ListKeyManagerOption} from '@angular/cdk/a11y/';

@Directive({
  selector: '[appListboxOption]',
  exportAs: 'cdkListboxOption',
  host: {
    role: 'option',
    '[attr.aria-selected]': 'selected',
    '[attr.aria-disabled]': 'disabled',
    '[attr.id]': '_id',
    tabindex: '-1'
  }
})
export class ListboxOptionDirective implements ListKeyManagerOption {

  constructor(private el: ElementRef) { }

  @Input() selected: boolean = false;
  @Input() disabled: boolean;
  @Input() label: string;
  @Input() _id: string;

  getLabel?(): string {
    return this.label;
  }

  getNativeElement(): ElementRef {
    return this.el;
  }

  setOptionId(optionId: string) {
    this._id = optionId;
  }

  getOptionId(): string {
    return this._id;
  }

  private updateBackground(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

}
