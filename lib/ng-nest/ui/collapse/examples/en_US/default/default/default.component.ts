import { Component } from '@angular/core';
import { XCollapseComponent, XCollapsePanelComponent } from '@ng-nest/ui/collapse';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [XCollapseComponent, XCollapsePanelComponent],
  templateUrl: './default.component.html'
})
export class ExDefaultComponent {}
