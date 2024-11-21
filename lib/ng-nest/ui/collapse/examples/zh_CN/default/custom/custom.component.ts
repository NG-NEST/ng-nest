import { Component } from '@angular/core';
import { XCollapseComponent, XCollapsePanelComponent } from '@ng-nest/ui/collapse';
import { XIconComponent } from '@ng-nest/ui/icon';

@Component({
  selector: 'ex-custom',
  imports: [XCollapseComponent, XCollapsePanelComponent, XIconComponent],
  templateUrl: './custom.component.html'
})
export class ExCustomComponent {}
