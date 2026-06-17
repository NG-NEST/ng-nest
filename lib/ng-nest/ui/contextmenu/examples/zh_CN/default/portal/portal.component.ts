import { Component, signal } from '@angular/core';
import { XContextmenuNode, XContextmenuComponent } from '@ng-nest/ui/contextmenu';

@Component({
  selector: 'ex-portal',
  templateUrl: './portal.component.html',
  imports: [XContextmenuComponent]
})
export class ExPortalComponent {
  data = signal<XContextmenuNode[]>([
    { id: '1', label: '复制', icon: 'fto-copy' },
    { id: '2', label: '粘贴', icon: 'fto-clipboard' },
    { id: '3', label: '剪切', icon: 'fto-scissors' },
    { id: '4', label: '删除', icon: 'fto-trash' },
    { id: '5', label: '全选', icon: 'fto-check-square' },
    { id: '6', label: '查找', icon: 'fto-search' },
    { id: '7', label: '替换', icon: 'fto-refresh-cw' }
  ]);

  onNodeClick(node: XContextmenuNode) {
    console.log('点击了菜单项:', node.label);
  }
}
