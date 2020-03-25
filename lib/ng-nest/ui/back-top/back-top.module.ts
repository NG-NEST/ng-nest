import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XBackTopComponent } from './back-top.component';
import { XLinkModule } from '@ng-nest/ui/link';

@NgModule({
  declarations: [XBackTopComponent],
  exports: [XBackTopComponent],
  imports: [CommonModule, XLinkModule]
})
export class XBackTopModule {}
