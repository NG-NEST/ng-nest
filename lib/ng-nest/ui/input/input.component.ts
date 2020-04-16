import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Renderer2,
  ElementRef,
  ViewChild,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { XInputPrefix, XInputProperty } from './input.property';
import { XIsEmpty, XValueAccessor, XIsChange } from '@ng-nest/ui/core';

@Component({
  selector: `${XInputPrefix}`,
  templateUrl: './input.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XInputComponent)]
})
export class XInputComponent extends XInputProperty implements OnInit, OnChanges {
  @ViewChild('input', { static: true }) input: ElementRef;
  @ViewChild('inputRef', { static: true }) inputRef: ElementRef;

  get getError() {
    return this.error || (this.required && XIsEmpty(this.value));
  }

  writeValue(value: any) {
    this.value = value;
    this.change(value);
    this.cdr.detectChanges();
  }

  private _required: boolean = false;
  valueLength: number = 0;
  lengthTotal: string = '';
  paddingLeft: number = 0.4;
  paddingRight: number = 0.4;
  clearShow: boolean = false;

  get getIcon() {
    return !XIsEmpty(this.icon);
  }

  get getIconLayoutLeft() {
    return !XIsEmpty(this.icon) && this.iconLayout === 'left';
  }

  get getIconLayoutRight() {
    return !XIsEmpty(this.icon) && this.iconLayout === 'right';
  }

  constructor(public renderer: Renderer2, public elementRef: ElementRef, private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.setPadding();
    this.setFlex(this.input.nativeElement, this.renderer, this.justify, this.align, this.direction);
    this.setSize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    XIsChange(changes.clearable) && this.setClearable();
  }

  change(value: any) {
    if (this._required && !this.disabled) {
      this.required = XIsEmpty(value);
    }
    this.setClearable();
    if (this.maxlength) {
      this.valueLength = XIsEmpty(value) ? 0 : `${value}`.length;
      this.lengthTotal = `${this.valueLength}/${this.maxlength}`;
    }
    this.setPadding();
    this.cdr.detectChanges();
    if (this.onChange) this.onChange(value);
  }

  clear() {
    const clearValue = this.value;
    this.value = '';
    this.change(this.value);
    this.clearEmit.emit(clearValue);
    this.inputRef.nativeElement.focus();
  }

  setClearable() {
    if (this.clearable && !this.disabled) {
      this.clearShow = !XIsEmpty(this.value);
    } else {
      this.clearShow = false;
    }
  }

  setPadding() {
    this.paddingLeft =
      this.maxlength && this.icon && this.iconLayout === 'right'
        ? (this.lengthTotal.length + 2) * 0.385
        : this.icon && this.iconLayout === 'left'
        ? 1.8
        : 0.4;
    this.paddingRight =
      this.maxlength && this.icon && this.iconLayout === 'left'
        ? (this.lengthTotal.length + 2) * 0.385
        : this.icon && this.iconLayout === 'right'
        ? 1.8
        : this.maxlength && !this.icon
        ? (this.lengthTotal.length + 2) * 0.385
        : 0.4;
  }

  setSize() {
    if (this.size) {
      this.renderer.addClass(this.input.nativeElement, `${XInputPrefix}-${this.size}`);
    }
  }
}
