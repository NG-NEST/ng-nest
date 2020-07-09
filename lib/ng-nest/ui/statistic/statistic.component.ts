import { Component, ViewEncapsulation, ChangeDetectionStrategy, SimpleChanges, OnChanges } from '@angular/core';
import { XStatisticPrefix, XStatisticProperty } from './statistic.property';
import { XIsChange, XConfigService } from '@ng-nest/ui/core';

@Component({
  selector: `${XStatisticPrefix}`,
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XStatisticComponent extends XStatisticProperty implements OnChanges {
  displayInt = '';
  displayDecimal = '';

  constructor(public configService: XConfigService) {
    super();
  }

  ngOnChanges(simples: SimpleChanges) {
    XIsChange(simples.value) && this.setDisplay();
  }

  setDisplay() {
    const decimalSeparator: string = '.';
    const val = String(this.value);
    const [int, decimal] = val.split(decimalSeparator);
    this.displayInt = decimal ? `${int}${decimalSeparator}` : int;
    this.displayDecimal = decimal;
  }
}
