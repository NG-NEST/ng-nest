import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XBadgeComponent } from './badge.component';
import { XBadgeProperty } from './badge.property';

@NgModule({
  declarations: [XBadgeComponent, XBadgeProperty],
  exports: [XBadgeComponent],
  imports: [CommonModule]
})
export class XBadgeModule {}
