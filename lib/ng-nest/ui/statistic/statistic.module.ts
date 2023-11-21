import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XStatisticComponent } from './statistic.component';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { XCountdownComponent } from './countdown.component';
import { XTimeRangeModule } from '@ng-nest/ui/time-range';
import { XStatisticProperty, XCountdownProperty } from './statistic.property';

@NgModule({
  declarations: [XStatisticComponent, XCountdownComponent, XStatisticProperty, XCountdownProperty],
  exports: [XStatisticComponent, XCountdownComponent],
  imports: [CommonModule, XOutletDirective, XTimeRangeModule]
})
export class XStatisticModule {}
