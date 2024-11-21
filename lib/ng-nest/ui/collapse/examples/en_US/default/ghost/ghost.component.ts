import { Component } from '@angular/core';
import { XCollapseComponent, XCollapsePanelComponent } from '@ng-nest/ui/collapse';

@Component({
  selector: 'ex-ghost',
  imports: [XCollapseComponent, XCollapsePanelComponent],
  templateUrl: './ghost.component.html'
})
export class ExGhostComponent {}