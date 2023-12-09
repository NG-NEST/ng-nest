import { NgModule } from '@angular/core';
import { XTabsComponent } from './tabs.component';
import { XTabComponent } from './tab.component';
import { XTabLinkTemplateDirective, XTabLinkDirective } from './tab-link.directive';

@NgModule({
  exports: [XTabsComponent, XTabComponent, XTabLinkDirective, XTabLinkTemplateDirective],
  imports: [XTabsComponent, XTabComponent, XTabLinkDirective, XTabLinkTemplateDirective]
})
export class XTabsModule {}
