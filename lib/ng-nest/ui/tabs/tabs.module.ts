import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XTabsComponent } from './tabs.component';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XSliderModule } from '@ng-nest/ui/slider';
import { XTabComponent } from './tab.component';
import { XTabContentComponent } from './tab-content.component';
import { XTabsProperty, XTabProperty } from './tabs.property';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XTabLinkTemplateDirective, XTabLinkDirective } from './tab-link.directive';

@NgModule({
  declarations: [
    XTabsComponent,
    XTabContentComponent,
    XTabComponent,
    XTabLinkDirective,
    XTabLinkTemplateDirective,
    XTabsProperty,
    XTabProperty
  ],
  exports: [
    XTabsComponent,
    XTabContentComponent,
    XTabComponent,
    XTabLinkDirective,
    XTabLinkTemplateDirective
  ],
  imports: [CommonModule, XSliderModule, XButtonComponent, XIconComponent]
})
export class XTabsModule {}
