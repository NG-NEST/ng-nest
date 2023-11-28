import { Component } from '@angular/core';
import { XCollapseComponent, XCollapsePanelComponent } from '@ng-nest/ui/collapse';
import { XIconComponent } from '@ng-nest/ui/icon';

@Component({
  selector: 'ex-icon',
  standalone: true,
  imports: [XCollapseComponent, XCollapsePanelComponent, XIconComponent],
  templateUrl: './icon.component.html'
})
export class ExIconComponent {}