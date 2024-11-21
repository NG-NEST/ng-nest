import { Component } from '@angular/core';
import { XCollapseComponent, XCollapsePanelComponent } from '@ng-nest/ui/collapse';

@Component({
  selector: 'ex-default',
  imports: [XCollapseComponent, XCollapsePanelComponent],
  templateUrl: './default.component.html'
})
export class ExDefaultComponent {}
