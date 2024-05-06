import { Component } from '@angular/core';
import { XStepsComponent } from '@ng-nest/ui/steps';

@Component({
  selector: 'ex-layout',
  standalone: true,
  imports: [XStepsComponent],
  templateUrl: './layout.component.html'
})
export class ExLayoutComponent {
  data = [
    { label: '完成', description: '这是描述内容。' },
    { label: '进行中', description: '这是描述内容。' },
    { label: '等待', description: '这是描述内容。' }
  ];
}
