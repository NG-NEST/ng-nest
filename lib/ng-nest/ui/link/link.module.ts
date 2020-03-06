import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XLinkComponent } from './link.component';
import { XIconModule } from '@ng-nest/ui/icon';
import { XOutletModule } from '@ng-nest/ui/outlet';

@NgModule({
  declarations: [XLinkComponent],
  exports: [XLinkComponent],
  imports: [CommonModule, XIconModule, XOutletModule]
})
export class XLinkModule {}
