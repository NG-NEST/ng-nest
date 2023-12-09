import { Component, ViewEncapsulation, ChangeDetectionStrategy, SimpleChanges, OnChanges, inject } from '@angular/core';
import { XStatisticPrefix, XStatisticProperty } from './statistic.property';
import { XIsChange, XConfigService } from '@ng-nest/ui/core';
import { CommonModule } from '@angular/common';
import { XOutletDirective } from '@ng-nest/ui/outlet';

@Component({
  selector: `${XStatisticPrefix}`,
  standalone: true,
  imports: [CommonModule, XOutletDirective],
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XStatisticComponent extends XStatisticProperty implements OnChanges {
  displayInt = '';
  displayDecimal = '';
  configService = inject(XConfigService);

  ngOnChanges(simples: SimpleChanges) {
    const { value } = simples;
    XIsChange(value) && this.setDisplay();
  }

  setDisplay() {
    const decimalSeparator: string = '.';
    const val = String(this.value);
    const [int, decimal] = val.split(decimalSeparator);
    this.displayInt = decimal ? `${int}${decimalSeparator}` : int;
    this.displayDecimal = decimal;
  }
}
