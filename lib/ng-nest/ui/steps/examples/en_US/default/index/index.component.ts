import { Component } from '@angular/core';
import { XData } from '@ng-nest/ui/core';
import { XStepsNode } from '@ng-nest/ui/steps';

@Component({
  selector: 'ex-index',
  templateUrl: './index.component.html'
})
export class ExIndexComponent {
  data: XData<XStepsNode> = [
    { label: 'carry out', description: 'This is the description.' },
    { label: 'processing', description: 'This is the description.' },
    { label: 'wait', description: 'This is the description.' }
  ];
}
