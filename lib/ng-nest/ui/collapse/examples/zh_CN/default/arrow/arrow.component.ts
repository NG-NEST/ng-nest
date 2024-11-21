import { Component } from '@angular/core';
import { XCollapseComponent, XCollapsePanelComponent } from '@ng-nest/ui/collapse';

@Component({
  selector: 'ex-arrow',
  imports: [XCollapseComponent, XCollapsePanelComponent],
  templateUrl: './arrow.component.html'
})
export class ExArrowComponent {}
