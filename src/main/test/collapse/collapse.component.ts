import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExAccordionComponent,
  ExArrowComponent,
  ExBorderComponent,
  ExCustomComponent,
  ExDisabledComponent,
  ExGhostComponent,
  ExIconComponent
} from '@ng-nest/ui/collapse/examples';

@Component({
  selector: 'te-collapse',
  standalone: true,
  imports: [
    ExDefaultComponent,
    ExAccordionComponent,
    ExArrowComponent,
    ExBorderComponent,
    ExCustomComponent,
    ExDisabledComponent,
    ExGhostComponent,
    ExIconComponent
  ],
  templateUrl: './collapse.component.html'
})
export class TeCollapseComponent {}
