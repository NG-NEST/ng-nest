import { Component, ViewEncapsulation, ChangeDetectionStrategy, Renderer2, ElementRef, ChangeDetectorRef, ViewChild } from '@angular/core';
import { XIsEmpty, XClearClass, XConfigService, XIsString, XIsObject } from '@ng-nest/ui/core';
import { XRatePrefix, XRateProperty } from './rate.property';
import { XValueAccessor } from '@ng-nest/ui/base-form';

@Component({
  selector: `${XRatePrefix}`,
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XRateComponent)]
})
export class XRateComponent extends XRateProperty {
  @ViewChild('rate', { static: true }) rate!: ElementRef<HTMLElement>;
  rates: number[] = [];

  hoverActivated = 0;
  hoverHalfActivated = 0;

  get getColor() {
    let color = '';
    if (XIsString(this.color)) {
      color = this.color as string;
    } else if (XIsObject(this.color)) {
      this.color = this.color as { [color: string]: (rate: number) => boolean };
      let val = this.half ? (Math.floor(this.hoverActivated) + this.hoverHalfActivated) * 0.5 : this.hoverActivated;
      for (let key in this.color) {
        if (this.color[key](val)) {
          color = key;
          break;
        }
      }
    }
    return color;
  }

  override get requiredIsEmpty() {
    return this.validator && this.required && (XIsEmpty(this.value) || this.value === 0);
  }

  override writeValue(value: any) {
    if (XIsEmpty(value)) value = 0;
    this.value = value;
    this.hoverActivated = value;
    this.hoverHalfActivated = Math.ceil(value);
    this.cdr.detectChanges();
  }

  rateNodes: any = [];
  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef<HTMLElement>,
    public override cdr: ChangeDetectorRef,
    public configService: XConfigService
  ) {
    super();
  }

  ngOnInit() {
    this.setRates();
    this.setFlex(this.rate.nativeElement, this.renderer, this.justify, this.align, this.direction);
    this.setClassMap();
  }

  setClassMap() {
    XClearClass(this.labelMap);
    this.labelMap[`x-text-align-${this.labelAlign}`] = this.labelAlign ? true : false;
  }

  setRates() {
    this.rates = Array(this.count)
      .fill(0)
      .map((_, i) => i + 1);
  }

  rateHover(rate: number, _event: MouseEvent) {
    if (this.disabled) return;
    this.hoverActivated = rate;
    this.cdr.detectChanges();
  }

  leaveRates() {
    if (this.disabled) return;
    const activited = this.value;
    this.hoverActivated = activited;
    this.hoverHalfActivated = Math.ceil(activited);
    this.cdr.detectChanges();
  }

  rateClick(rate: number, _event: MouseEvent) {
    if (this.disabled) return;
    this.formControlValidator();
    this.value = this.value === rate ? 0 : rate;
    if (this.onChange) this.onChange(this.value);
  }

  rateHalfHover(rate: number, _event: MouseEvent) {
    if (this.disabled) return;
    this.formControlValidator();
    this.hoverActivated = rate - 1;
    this.hoverHalfActivated = rate;
    this.cdr.detectChanges();
  }

  rateHalfClick(rate: number, _event: MouseEvent) {
    if (this.disabled) return;
    this.value = rate - 0.5;
    if (this.onChange) this.onChange(this.value);
  }

  trackByItem(_index: number, item: number) {
    return item;
  }

  formControlChanges() {
    this.ngOnInit();
    this.cdr.detectChanges();
  }
}
