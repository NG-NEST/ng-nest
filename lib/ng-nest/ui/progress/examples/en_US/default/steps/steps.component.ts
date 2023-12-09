import { Component } from '@angular/core';
import { XProgressComponent } from '@ng-nest/ui/progress';

@Component({
  selector: 'ex-steps',
  standalone: true,
  imports: [XProgressComponent],
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class ExStepsComponent {}
