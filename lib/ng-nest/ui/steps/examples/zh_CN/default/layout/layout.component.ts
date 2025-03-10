import { Component, signal } from '@angular/core';
import { XStepsComponent, XStepsNode } from '@ng-nest/ui/steps';

@Component({
  selector: 'ex-layout',
  imports: [XStepsComponent],
  templateUrl: './layout.component.html'
})
export class ExLayoutComponent {
  data = signal<XStepsNode[]>([
    { label: '完成', description: '这是描述内容。' },
    { label: '进行中', description: '这是描述内容。' },
    { label: '等待', description: '这是描述内容。' }
  ]);
}
