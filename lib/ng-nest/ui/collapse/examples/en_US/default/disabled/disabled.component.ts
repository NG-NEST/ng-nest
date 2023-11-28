import { Component } from '@angular/core';
import { XCollapseComponent, XCollapsePanelComponent } from '@ng-nest/ui/collapse';

@Component({
  selector: 'ex-disabled',
  standalone: true,
  imports: [XCollapseComponent, XCollapsePanelComponent],
  templateUrl: './disabled.component.html'
})
export class ExDisabledComponent {}
