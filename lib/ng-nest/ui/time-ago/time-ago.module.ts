import { NgModule } from '@angular/core';
import { XTimeAgoPipe } from './time-ago.pipe';

@NgModule({
  exports: [XTimeAgoPipe],
  imports: [XTimeAgoPipe]
})
export class XTimeAgoModule {}
