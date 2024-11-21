import { Component, signal } from '@angular/core';
import { XStepsComponent } from '@ng-nest/ui/steps';

@Component({
  selector: 'ex-custom',
  imports: [XStepsComponent],
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.html']
})
export class ExCustomComponent {
  activatedIndex = signal(1);
  data = signal(['step 1', 'step 2', 'step 3']);
}
