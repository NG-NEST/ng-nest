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
  data = signal(['步骤 1', '步骤 2', '步骤 3']);
}
