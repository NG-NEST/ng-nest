import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XSlideComponent } from './slide.component';
import { XLinkModule } from '@ng-nest/ui/link';
import { XButtonModule } from '@ng-nest/ui/button';

@NgModule({
  declarations: [XSlideComponent],
  exports: [XSlideComponent],
  imports: [CommonModule, XLinkModule, XButtonModule]
})
export class XSlideModule {}
