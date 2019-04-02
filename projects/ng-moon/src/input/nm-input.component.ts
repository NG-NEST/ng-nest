import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, forwardRef, ChangeDetectorRef, Renderer2, ElementRef } from '@angular/core';
import { InputOption, InputLayoutEnum, InputTypeEnum, InputIconLayoutEnum } from './nm-input.type';
import { fillDefault } from '../core/util';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { noop } from 'rxjs';

@Component({
  selector: 'nm-input',
  templateUrl: './nm-input.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['option'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NmInputComponent),
    multi: true
  }],
  host: {
    '[class.nm-input-disabled]': 'option.disabled',
    '[class.nm-input-lg]': `option.size === 'large'`,
    '[class.nm-input-sm]': `option.size === 'small'`
  }
})
export class NmInputComponent implements OnInit, ControlValueAccessor {

  option: InputOption = {};

  private _default: InputOption = {
    layout: InputLayoutEnum.Vertical,
    label: '',
    required: false,
    placeholder: '',
    type: InputTypeEnum.Text,
    iconLayout: InputIconLayoutEnum.Right
  }

  value: string | number;
  onChangeFn: (val: string | number) => void = noop;
  onTouchedFn: () => void = noop;

  writeValue(val: string | number): void {
    this.value = val ? val : null;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onChangeFn = fn;
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private ele: ElementRef
  ) {
    this.renderer.addClass(this.ele.nativeElement, 'nm-input');
  }

  ngOnInit() {
    fillDefault(this.option, this._default)
  }

}

