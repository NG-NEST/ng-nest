import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExCircleComponent,
  ExColorComponent,
  ExDashboardComponent,
  ExSubsectionComponent,
  ExFormatComponent,
  ExGradientComponent,
  ExInsideComponent,
  ExStepsComponent
} from '@ng-nest/ui/progress/examples';

@Component({
  selector: 'te-progress',
  imports: [
    ExDefaultComponent,
    ExCircleComponent,
    ExColorComponent,
    ExDashboardComponent,
    ExSubsectionComponent,
    ExFormatComponent,
    ExGradientComponent,
    ExInsideComponent,
    ExStepsComponent
  ],
  templateUrl: './progress.component.html'
})
export class TeProgressComponent {}
