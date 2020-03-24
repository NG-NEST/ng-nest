import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XSliderComponent } from './slider.component';
import { XLinkModule } from '@ng-nest/ui/link';
import { XButtonModule } from '@ng-nest/ui/button';
import { XOutletModule } from '@ng-nest/ui/outlet';

@NgModule({
  declarations: [XSliderComponent],
  exports: [XSliderComponent],
  imports: [CommonModule, XLinkModule, XButtonModule, XOutletModule]
})
export class XSliderModule {}
