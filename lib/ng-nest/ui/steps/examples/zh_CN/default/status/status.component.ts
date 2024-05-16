import { Component, signal } from '@angular/core';
import { XStepsComponent, XStepsNode } from '@ng-nest/ui/steps';

@Component({
  selector: 'ex-status',
  standalone: true,
  imports: [XStepsComponent],
  templateUrl: './status.component.html'
})
export class ExStatusComponent {
  data = signal<XStepsNode[]>([
    { label: '完成', description: '这是描述内容。' },
    { label: '执行错误', description: '这是描述内容。' },
    { label: '等待', description: '这是描述内容。' }
  ]);
}
