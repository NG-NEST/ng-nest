import { Component } from '@angular/core';

@Component({
  selector: 'ex-index',
  templateUrl: './index.component.html'
})
export class ExIndexComponent {
  data = [
    { label: '完成', description: '这是描述内容。' },
    { label: '进行中', description: '这是描述内容。' },
    { label: '等待', description: '这是描述内容。' }
  ];
}
