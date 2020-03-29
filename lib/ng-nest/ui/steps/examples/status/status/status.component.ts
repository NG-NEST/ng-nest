import { Component } from '@angular/core';

@Component({
  selector: 'ex-status',
  templateUrl: './status.component.html'
})
export class ExStatusComponent {
  data = [
    { label: '完成', description: '这是描述内容。' },
    { label: '执行错误', description: '这是描述内容。' },
    { label: '等待', description: '这是描述内容。' }
  ];
}
