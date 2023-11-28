import { Component } from '@angular/core';
import { XCollapseComponent, XCollapsePanelComponent } from '@ng-nest/ui/collapse';

@Component({
  selector: 'ex-border',
  standalone: true,
  imports: [XCollapseComponent, XCollapsePanelComponent],
  templateUrl: './border.component.html'
})
export class ExBorderComponent {}