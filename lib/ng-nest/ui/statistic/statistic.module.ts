import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XStatisticComponent } from './statistic.component';
import { XOutletModule } from '@ng-nest/ui/outlet';
import { XCountdownComponent } from './countdown.component';
import { XTimeRangeModule } from '@ng-nest/ui/time-range';

@NgModule({
  declarations: [XStatisticComponent, XCountdownComponent],
  exports: [XStatisticComponent, XCountdownComponent],
  imports: [CommonModule, XOutletModule, XTimeRangeModule]
})
export class XStatisticModule {}
