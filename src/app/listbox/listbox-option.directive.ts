import {Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';
import {ListKeyManagerOption} from '@angular/cdk/a11y/';

@Directive({
  selector: '[appListboxOption]',
  exportAs: 'cdkListboxOption',
  host: {
    role: 'option',
    tabindex: '0'
  }
})
export class ListboxOptionDirective implements ListKeyManagerOption {

  constructor(private el: ElementRef) { }

  @Input('aria-label') ariaLabel: string;

  @Input('aria-labelledby') ariaLabelledBy: string;

  @Input() selected: boolean;

  @Input() label: string;

  @HostBinding('attr.id') id: string;
  // @HostBinding('attr.aria-role') role = 'option';
  // @HostBinding('attr.tabindex') tabindex = 0;

  public disabled = false;

  getLabel?(): string {
    return this.label;
  }

  getNativeElement(): ElementRef {
    return this.el;
  }

  setOptionId(optionId: string) {
    this.id = optionId;
  }

  private updateBackground(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

}
