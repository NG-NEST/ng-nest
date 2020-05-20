import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XMenuComponent } from './menu.component';
import { XMenuNodeComponent } from './menu-node.component';
import { XDropdownModule } from '@ng-nest/ui/dropdown';
import { XSliderModule } from '@ng-nest/ui/slider';
import { XIconModule } from '@ng-nest/ui/icon';
import { XMenuProperty, XMenuNodeProperty } from './menu.property';

@NgModule({
  declarations: [XMenuComponent, XMenuNodeComponent, XMenuProperty, XMenuNodeProperty],
  exports: [XMenuComponent, XMenuNodeComponent],
  imports: [CommonModule, XDropdownModule, XSliderModule, XIconModule]
})
export class XMenuModule {}
