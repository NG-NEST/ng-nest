import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XSliderComponent } from './slider.component';
import { XLinkModule } from '@ng-nest/ui/link';
import { XButtonModule } from '@ng-nest/ui/button';
import { XOutletModule } from '@ng-nest/ui/outlet';
import { XSliderProperty } from './slider.property';
import { XDropdownModule } from '@ng-nest/ui/dropdown';

@NgModule({
  declarations: [XSliderComponent, XSliderProperty],
  exports: [XSliderComponent],
  imports: [CommonModule, XLinkModule, XButtonModule, XOutletModule, XDropdownModule]
})
export class XSliderModule {}
