import { Component, signal } from '@angular/core';
import { XContextmenuNode, XContextmenuComponent } from '@ng-nest/ui/contextmenu';

@Component({
  selector: 'ex-disabled',
  templateUrl: './disabled.component.html',
  imports: [XContextmenuComponent]
})
export class ExDisabledComponent {
  data = signal<XContextmenuNode[]>([
    { id: '1', label: '复制', icon: 'fto-copy' },
    { id: '2', label: '粘贴', icon: 'fto-clipboard' },
    { id: '3', label: '剪切', icon: 'fto-scissors' }
  ]);

  onNodeClick(node: XContextmenuNode) {
    console.log('点击了菜单项:', node.label);
  }
}
