import { Component } from '@angular/core';

@Component({
  selector: 'ex-layout',
  templateUrl: './layout.component.html'
})
export class ExLayoutComponent {
  data = [
    { label: '完成', description: '这是描述内容。' },
    { label: '进行中', description: '这是描述内容。' },
    { label: '等待', description: '这是描述内容。' }
  ];
}
