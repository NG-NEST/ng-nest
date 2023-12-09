import { NgModule } from '@angular/core';
import { XStatisticComponent } from './statistic.component';
import { XCountdownComponent } from './countdown.component';

@NgModule({
  exports: [XStatisticComponent, XCountdownComponent],
  imports: [XStatisticComponent, XCountdownComponent]
})
export class XStatisticModule {}
