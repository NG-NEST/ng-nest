import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XTabsComponent } from './tabs.component';
import { XIconModule } from '@ng-nest/ui/icon';
import { XSliderModule } from '@ng-nest/ui/slider';
import { XTabComponent } from './tab.component';
import { XTabContentComponent } from './tab-content.component';
import { XTabsProperty, XTabProperty } from './tabs.property';
import { XButtonModule } from '@ng-nest/ui/button';

@NgModule({
  declarations: [XTabsComponent, XTabContentComponent, XTabComponent, XTabsProperty, XTabProperty],
  exports: [XTabsComponent, XTabContentComponent, XTabComponent],
  imports: [CommonModule, XSliderModule, XButtonModule, XIconModule]
})
export class XTabsModule {}
