import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XCollapseComponent } from './collapse.component';
import { XCollapsePanelComponent } from './collapse-panel.component';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { XCollapseProperty, XCollapsePanelProperty } from './collapse.property';

@NgModule({
  declarations: [XCollapseComponent, XCollapsePanelComponent, XCollapseProperty, XCollapsePanelProperty],
  exports: [XCollapseComponent, XCollapsePanelComponent],
  imports: [CommonModule, XIconComponent, XOutletDirective]
})
export class XCollapseModule {}
