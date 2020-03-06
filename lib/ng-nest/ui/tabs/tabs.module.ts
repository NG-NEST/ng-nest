import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XTabsComponent } from './tabs.component';
import { XIconModule } from '@ng-nest/ui/icon';
import { XSliderModule } from '@ng-nest/ui/slider';
import { XTabComponent } from './tab.component';
import { XTabContentComponent } from './tab-content.component';

@NgModule({
  declarations: [XTabsComponent, XTabContentComponent, XTabComponent],
  exports: [XTabsComponent, XTabContentComponent, XTabComponent],
  imports: [CommonModule, XSliderModule, XIconModule]
})
export class XTabsModule {}
