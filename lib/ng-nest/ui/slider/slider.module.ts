import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XSliderComponent } from './slider.component';
import { XLinkModule } from '@ng-nest/ui/link';
import { XButtonModule } from '@ng-nest/ui/button';

@NgModule({
  declarations: [XSliderComponent],
  exports: [XSliderComponent],
  imports: [CommonModule, XLinkModule, XButtonModule]
})
export class XSliderModule {}
