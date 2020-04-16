import { Component, ViewEncapsulation, ChangeDetectionStrategy, Renderer2, ElementRef, ChangeDetectorRef, Input } from '@angular/core';
import { XValueAccessor, XIsEmpty } from '@ng-nest/ui/core';
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
  rates = Array(this.count)
    .fill(0)
    .map((_, i) => i + 1);

  hoverActivated = 0;

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
}
