import {Directive, ElementRef, Input} from '@angular/core';
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

  private disable?: boolean;

  getLabel?(): string {
    return this.label;
  }

}
