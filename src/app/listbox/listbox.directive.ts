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
import {ListKeyManager, ActiveDescendantKeyManager} from "@angular/cdk/a11y";
import {ENTER, SPACE} from "@angular/cdk/keycodes";
import {Observable} from "rxjs";

let _uniqueIdCounter = 0;

@Directive({
  selector: '[appListbox]',
  exportAs: 'cdkListbox',
  host: {
    role: 'listbox',
    '(keydown)': '_keydown($event)',
    '[attr.disabled]': '_disabled',
    '[attr.aria-disabled]': '_disabled',
    '[attr.aria-multiselectable]': '_multiSelectable',
    '[attr.aria-activedescendant]': '_activeDescendant',
    tabindex: '0'
  }
})
export class ListboxDirective {

  constructor(private el: ElementRef) { }

  private _disabled = false;
  private _recentlySelected: ListboxOptionDirective;
  private _activeOption: ListboxOptionDirective;
  private _multiSelectable = false;
  private _focused = false;
  private _listKeyManager: ActiveDescendantKeyManager<ListboxOptionDirective>;
  private selectedOptions: ListboxOptionDirective[] = [];
  private selectedIndices: number[] = [];
  private selectedIndex: number;
  private _activeDescendant: string | null = null;
  private _useActiveDescendant = true;
  private typeAheadDebounceInterval = 200;

  private observable = new Observable(subscriber => {
    subscriber.next()
  });

  @ContentChildren(ListboxOptionDirective) _options: QueryList<ListboxOptionDirective>;

  @HostListener('click', ['$event']) onClickUpdateSelectedOption($event) {
    console.log($event);
    console.log(this.el);
    let selectedOption: ListboxOptionDirective;
    let selectedIndex: number;
    this._options.toArray().forEach(option => {
      if (option.getOptionId() === $event.target.id) {
        selectedOption = option;
        selectedIndex = this._options.toArray().indexOf(option);
      }
    });
    this.updateOptionAfterPress(selectedOption);
    this._listKeyManager.setActiveItem(selectedIndex);
  }

  @Input()
  get useActiveDescendant(): boolean {
    return this._useActiveDescendant;
  }
  set useActiveDescendant(shouldUseActiveDescendant: boolean) {
    this._useActiveDescendant = shouldUseActiveDescendant;
  }

  @Input()
  get activeDescendant(): string {
    return this._activeDescendant;
  }

  set activeDescendant(descendant: string) {
    if (this._useActiveDescendant) {
      this._activeDescendant = descendant;
    }
  }

  @Input()
  get multiSelectable(): boolean {
    return this._multiSelectable;
  }

  set multiSelectable(enabled: boolean) {
    if (!this._multiSelectable && enabled) {
      if (this._recentlySelected) {
        this.selectedOptions.push(this._recentlySelected);
        this.selectedIndices.push(this._options.toArray().indexOf(this._recentlySelected));
      }
    } else {
      this.deselectAllOptions();
    }
    this._multiSelectable = enabled;
  }

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(isDisabled: boolean) {
    this._disabled = isDisabled;
  }

  @Input()
  get focused(): boolean {
    return this._focused;
  }

  set focused(isFocused: boolean) {
    this._focused = isFocused;
  }

  ngAfterViewInit() {
    // TODO check if the id was already set by the user

    this._options.forEach(option => {
      option.setOptionId(`cdk-option-${_uniqueIdCounter++}`);
      if (!this._useActiveDescendant) {
        option.tabindex = -1;
      }
    });

    this._listKeyManager = new ActiveDescendantKeyManager(this._options)
      .withWrap().withVerticalOrientation(true).withTypeAhead(this.typeAheadDebounceInterval);

    this._listKeyManager.change.subscribe(() => {
      this.updateActiveItem();
    });
  }

  _keydown(event: KeyboardEvent): void {
    // TODO check for modifier keys

    const keycode = event.keyCode;

    switch (keycode) {
      case SPACE:
        this.updateOptionAfterPress(this._activeOption);
        this.updateActiveItem();
        break;
      case ENTER:
        this.updateOptionAfterPress(this._activeOption);
        this.updateActiveItem();
        break;
      default:
        this._listKeyManager.onKeydown(event);
    }
  }

  updateOptionAfterPress(option: ListboxOptionDirective) {
    if (option && !option.disabled) {
      this.activateOption(option);
      this.updateSelectedOption(option);
    }
  }

  updateActiveItem() {
    if (this._listKeyManager.activeItem) {
      this.activateOption(this._listKeyManager.activeItem);
    }
  }

  updateSelectedOption(option: ListboxOptionDirective) {
    // TODO determine how to update focus of option on select

    if (this._multiSelectable) {
      if (this.selectedOptions.includes(option)) {
        this.deselectOption(option);
        const indexInSelectedOption = this.selectedOptions.indexOf(option);
        const indexInSelectedIndices = this.selectedIndices.indexOf(this._options.toArray().indexOf(option));
        this.selectedOptions.splice(indexInSelectedOption, 1);
        this.selectedIndices.splice(indexInSelectedIndices, 1);
      } else {
        this.selectedOptions.push(option);
        this.selectedIndices.push(this._options.toArray().indexOf(option));
        this.selectOption(option);
      }
    } else {
      if (this._recentlySelected) {
          if (this._recentlySelected === option) {
            this._recentlySelected = null;
            this.selectedIndex = -1;
            this.deselectOption(option);
          } else {
            this.deselectOption(this._recentlySelected);
            this._recentlySelected = option;
            this.selectedIndex = this._options.toArray().indexOf(option);
            this.selectOption(option);
          }
      } else {
        this._recentlySelected = option;
        this.selectedIndex = this._options.toArray().indexOf(option);
        this.selectOption(option);
      }
    }
    console.log(option);
  }

  activateOption(option: ListboxOptionDirective): void {
    this.activeDescendant = option._id;
    if (this._activeOption) {
      this._activeOption.active = false;
      this.blur(this._activeOption);
      if (!this._activeOption.selected) {
        this.highlight(this._activeOption, null);
      }
    }
    this._activeOption = option;
    option.active = true;

    if (!this.useActiveDescendant) {
      this.focusOption(option);
    }

    if (!option.selected) {
      this.highlight(option, 'lightgrey');
    }
  }

  selectOption(option: ListboxOptionDirective): void {
    this.highlight(option, 'lightblue');
    option.selected = true;
  }

  deselectOption(option: ListboxOptionDirective): void {
    this.highlight(option, null);
    this.blur(option);
    option.selected = null;
  }

  selectAllOptions(): void {
    if (this._multiSelectable) {
      this.selectedOptions = this._options.toArray();
      this.selectedIndices = [];

      this._options.forEach(option => {
        if (!option.disabled) {
          this.selectedIndices.push(this._options.toArray().indexOf(option));
          this.selectedOptions.push(option);
          this.selectOption(option);
        }
      });
    }
  }

  deselectAllOptions(): void {
    this.selectedOptions = [];
    this.selectedIndices = [];
    this._recentlySelected = null;
    this.selectedIndex = null;

    if (this._options) {
      this._options.forEach(option => {
        this.deselectOption(option);
      });
    }
  }

  setDisabledListbox(isDisabled: boolean): void {
    this._disabled = isDisabled;
    this.el.nativeElement.disabled = true;
    this._options.forEach(option => {
      option.disabled = true;
      option.getNativeElement().nativeElement.disabled = true;
      this.greyOutOption(option);
      this.deselectOption(option);
    });
    console.log(this.el);
  }

  setDisabledOption(optionIsDisabled: boolean, optionIndex: number): void {
    const option = this._options.toArray()[optionIndex];
    option.disabled = optionIsDisabled;
    option.getNativeElement().nativeElement.disabled = optionIsDisabled;
    this.greyOutOption(option);
    this.deselectOption(option);
  }

  focusOption(option: ListboxOptionDirective): void {
    option.getNativeElement().nativeElement.focus();
  }

  blur(option: ListboxOptionDirective): void {
    option.getNativeElement().nativeElement.blur();
  }

  highlight(option: ListboxOptionDirective, color: string): void {
    option.getNativeElement().nativeElement.style.backgroundColor = color;
  }

  greyOutOption(option: ListboxOptionDirective): void {
    option.getNativeElement().nativeElement.style.color = 'grey';
  }
}
