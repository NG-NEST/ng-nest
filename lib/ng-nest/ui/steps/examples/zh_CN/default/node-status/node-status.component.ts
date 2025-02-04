import { Component, signal } from '@angular/core';
import { XStepsComponent, XStepsNode } from '@ng-nest/ui/steps';

@Component({
  selector: 'ex-node-status',
  imports: [XStepsComponent],
  templateUrl: './node-status.component.html'
})
export class ExNodeStatusComponent {
  activatedIndex = signal(0);
  data = signal<XStepsNode[]>([
    { label: '步骤 1', status: 'process' },
    { label: '步骤 2', status: 'finish' },
    { label: '步骤 3', status: 'process' },
    { label: '步骤 4', status: 'finish' },
    { label: '步骤 5', status: 'error' },
    { label: '步骤 6', status: 'process' }
  ]);
}
