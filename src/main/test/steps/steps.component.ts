import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExCustomComponent,
  ExDescriptionComponent,
  ExIconComponent,
  ExIndexComponent,
  ExLayoutComponent,
  ExNodeStatusComponent,
  ExStatusComponent,
  ExTabsComponent
} from '@ng-nest/ui/steps/examples';

@Component({
  selector: 'te-steps',
  imports: [
    ExDefaultComponent,
    ExCustomComponent,
    ExDescriptionComponent,
    ExIconComponent,
    ExIndexComponent,
    ExLayoutComponent,
    ExNodeStatusComponent,
    ExStatusComponent,
    ExTabsComponent
  ],
  templateUrl: './steps.component.html'
})
export class TeStepsComponent {}
