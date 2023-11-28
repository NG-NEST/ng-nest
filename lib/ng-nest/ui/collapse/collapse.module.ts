import { NgModule } from '@angular/core';
import { XCollapseComponent } from './collapse.component';
import { XCollapsePanelComponent } from './collapse-panel.component';

@NgModule({
  exports: [XCollapseComponent, XCollapsePanelComponent],
  imports: [XCollapseComponent, XCollapsePanelComponent]
})
export class XCollapseModule {}
