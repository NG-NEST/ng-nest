import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XBadgeComponent } from './badge.component';

@NgModule({
  declarations: [XBadgeComponent],
  exports: [XBadgeComponent],
  imports: [CommonModule]
})
export class XBadgeModule {}
