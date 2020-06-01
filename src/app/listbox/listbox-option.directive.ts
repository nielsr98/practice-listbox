import {Directive, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {ListKeyManagerOption} from '@angular/cdk/a11y/';

@Directive({
  selector: '[appListboxOption]',
  exportAs: 'cdkListboxOption'
})
export class ListboxOptionDirective implements ListKeyManagerOption {

  constructor(private el: ElementRef) { }

  @Input('aria-label') ariaLabel: string;

  @Input('aria-labelledby') ariaLabelledBy: string;

  @Input() selected: boolean;

  @Input() label: string;

  @Output() selectionChange = new EventEmitter<ListboxOptionDirective>();

  @HostListener('click') onClick() {
    this.selected = !this.selected;
    this.selectionChange.emit(this);
    if (this.selected) {
      this.focusOption();
    }
  }

  private disable?: boolean;

  getLabel?(): string {
    return this.label;
  }

  focusOption() {
    this.el.nativeElement.focus();
  }

}
