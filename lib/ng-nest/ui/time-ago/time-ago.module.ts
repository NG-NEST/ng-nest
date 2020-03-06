import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { XTimeAgoPipe } from './time-ago.pipe';

@NgModule({
  declarations: [XTimeAgoPipe],
  exports: [XTimeAgoPipe],
  providers: [DatePipe]
})
export class XTimeAgoModule {}
