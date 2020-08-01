import { Component } from '@angular/core';
import { XData } from '@ng-nest/ui/core';
import { XStepsNode } from '@ng-nest/ui/steps';

@Component({
  selector: 'ex-layout',
  templateUrl: './layout.component.html'
})
export class ExLayoutComponent {
  data: XData<XStepsNode> = [
    { label: 'carry out', description: 'This is the description.' },
    { label: 'processing', description: 'This is the description.' },
    { label: 'wait', description: 'This is the description.' }
  ];
}
