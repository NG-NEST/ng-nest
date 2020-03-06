import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XCollapseComponent } from './collapse.component';
import { XCollapsePanelComponent } from './collapse-panel.component';
import { XIconModule } from '@ng-nest/ui/icon';

@NgModule({
  declarations: [XCollapseComponent, XCollapsePanelComponent],
  exports: [XCollapseComponent, XCollapsePanelComponent],
  imports: [CommonModule, XIconModule]
})
export class XCollapseModule {}
