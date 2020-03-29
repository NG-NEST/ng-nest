import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XPageHeaderComponent } from './page-header.component';
import { XLinkModule } from '@ng-nest/ui/link';
import { XButtonModule } from '@ng-nest/ui/button';

@NgModule({
  declarations: [XPageHeaderComponent],
  exports: [XPageHeaderComponent],
  imports: [CommonModule, XLinkModule, XButtonModule]
})
export class XPageHeaderModule {}
