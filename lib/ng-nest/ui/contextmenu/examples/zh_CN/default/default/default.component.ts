import { Component, signal, afterNextRender } from '@angular/core';
import { XContextmenuNode, XContextmenuComponent } from '@ng-nest/ui/contextmenu';

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html',
  imports: [XContextmenuComponent]
})
export class ExDefaultComponent {
  data = signal<XContextmenuNode[]>([
    { id: '1', label: '复制', icon: 'fto-copy' },
    { id: '2', label: '粘贴', icon: 'fto-clipboard' },
    { id: '3', label: '剪切', icon: 'fto-scissors' },
    { id: '4', label: '删除', icon: 'fto-trash' }
  ]);

  constructor() {
    afterNextRender(() => {
      // 确保元素已渲染
    });
  }

  onNodeClick(node: XContextmenuNode) {
    console.log('点击了菜单项:', node.label);
  }
}
