import { Component } from '@angular/core';
import { XStepsComponent } from '@ng-nest/ui/steps';

@Component({
  selector: 'ex-index',
  standalone: true,
  imports: [XStepsComponent],
  templateUrl: './index.component.html'
})
export class ExIndexComponent {
  data= [
    { label: '完成', description: '这是描述内容。' },
    { label: '进行中', description: '这是描述内容。' },
    { label: '等待', description: '这是描述内容。' }
  ];
}
