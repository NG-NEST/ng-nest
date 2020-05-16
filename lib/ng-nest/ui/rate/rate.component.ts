import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  Input,
  ViewChild
} from '@angular/core';
import { XValueAccessor, XIsEmpty, XNumber, XClearClass } from '@ng-nest/ui/core';
import { XRatePrefix, XRateProperty } from './rate.property';

@Component({
  selector: `${XRatePrefix}`,
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XRateComponent)]
})
export class XRateComponent extends XRateProperty {
  @ViewChild('rate', { static: true }) rate: ElementRef;
  rates: XNumber[] = [];

  hoverActivated = 0;

  get getError() {
    return this.error || (this.required && XIsEmpty(this.value));
  }

  writeValue(value: any) {
    if (XIsEmpty(value)) value = 0;
    this.value = value;
    this.hoverActivated = value;
    this.cdr.detectChanges();
  }

  rateNodes: any = [];
  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {
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

  hoverRate(rate: number) {
    if (this.disabled) return;
    this.hoverActivated = rate;
    this.cdr.detectChanges();
  }

  leaveRates() {
    if (this.disabled) return;
    const activited = this.value;
    this.hoverActivated = activited;
    this.cdr.detectChanges();
  }

  rateClick(rate: number) {
    if (this.disabled) return;
    this.value = this.value === rate ? 0 : rate;
    if (this.onChange) this.onChange(this.value);
  }

  formControlChanges() {
    this.ngOnInit();
    this.cdr.detectChanges();
  }
}
