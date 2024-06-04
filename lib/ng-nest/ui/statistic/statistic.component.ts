import { Component, ViewEncapsulation, ChangeDetectionStrategy, computed } from '@angular/core';
import { XStatisticPrefix, XStatisticProperty } from './statistic.property';
import { XIsString } from '@ng-nest/ui/core';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { NgStyle } from '@angular/common';

@Component({
  selector: `${XStatisticPrefix}`,
  standalone: true,
  imports: [NgStyle, XOutletDirective],
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XStatisticComponent extends XStatisticProperty {
  displayInt = computed(() => {
    const value = this.value();
    if (!XIsString(value)) return '';
    const decimalSeparator: string = '.';
    const [int, decimal] = value.split(decimalSeparator);
    return decimal ? `${int}${decimalSeparator}` : int;
  });
  displayDecimal = computed(() => {
    const value = this.value();
    if (!XIsString(value)) return '';
    const decimalSeparator: string = '.';
    const [_int, decimal] = value.split(decimalSeparator);
    return decimal;
  });
}
