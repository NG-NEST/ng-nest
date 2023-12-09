import { NgModule } from '@angular/core';
import { XTimeRangePipe } from './time-range.pipe';

@NgModule({
  exports: [XTimeRangePipe],
  imports: [XTimeRangePipe]
})
export class XTimeRangeModule {}
