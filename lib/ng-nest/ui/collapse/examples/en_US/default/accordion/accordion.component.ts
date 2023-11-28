import { Component } from '@angular/core';
import { XCollapseComponent, XCollapsePanelComponent } from '@ng-nest/ui/collapse';

@Component({
  selector: 'ex-accordion',
  standalone: true,
  imports: [XCollapseComponent, XCollapsePanelComponent],
  templateUrl: './accordion.component.html'
})
export class ExAccordionComponent {}
