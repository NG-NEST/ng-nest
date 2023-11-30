import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XSliderComponent } from './slider.component';
import { XLinkComponent } from '@ng-nest/ui/link';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { XSliderProperty } from './slider.property';
import { XDropdownComponent } from '@ng-nest/ui/dropdown';

@NgModule({
  declarations: [XSliderComponent, XSliderProperty],
  exports: [XSliderComponent],
  imports: [CommonModule, XLinkComponent, XButtonComponent, XOutletDirective, XDropdownComponent]
})
export class XSliderModule {}
