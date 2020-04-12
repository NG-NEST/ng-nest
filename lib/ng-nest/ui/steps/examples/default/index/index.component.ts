import { Component } from '@angular/core';
import { XData } from '@ng-nest/ui/core';
import { XStepsNode } from '@ng-nest/ui/steps';

@Component({
  selector: 'ex-index',
  templateUrl: './index.component.html'
})
export class ExIndexComponent {
  data: XData<XStepsNode> = [
    { label: '完成', description: '这是描述内容。' },
    { label: '进行中', description: '这是描述内容。' },
    { label: '等待', description: '这是描述内容。' }
  ];
}
