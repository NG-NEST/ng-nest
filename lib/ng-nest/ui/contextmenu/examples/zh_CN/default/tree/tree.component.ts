import { Component, signal, viewChild, ElementRef } from '@angular/core';
import { XContextmenuNode, XContextmenuComponent } from '@ng-nest/ui/contextmenu';

@Component({
  selector: 'ex-tree',
  templateUrl: './tree.component.html',
  imports: [XContextmenuComponent]
})
export class ExTreeComponent {
  imgElement = viewChild<ElementRef>('img');

  data = signal<XContextmenuNode[]>([
    {
      id: '1',
      label: '文件',
      icon: 'fto-file'
    },
    { id: '1-1', pid: '1', label: '新建' },
    { id: '1-2', pid: '1', label: '打开' },
    { id: '1-3', pid: '1', label: '保存' },
    {
      id: '2',
      label: '编辑',
      icon: 'fto-edit',
      children: []
    },
    { id: '2-1', pid: '2', label: '撤销' },
    { id: '2-2', pid: '2', label: '重做' },
    {
      id: '2-3',
      pid: '2',
      label: '剪切板'
    },
    { id: '2-3-1', pid: '2-3', label: '复制' },
    { id: '2-3-2', pid: '2-3', label: '粘贴' },
    { id: '2-3-3', pid: '2-3', label: '剪切' },

    {
      id: '3',
      label: '视图',
      icon: 'fto-eye',
      children: []
    },
    { id: '3-1', pid: '3', label: '放大' },
    { id: '3-2', pid: '3', label: '缩小' },
    { id: '3-3', pid: '3', label: '实际大小' },
    { id: '4', label: '帮助', icon: 'fto-help-circle' }
  ]);

  onNodeClick(node: XContextmenuNode) {
    console.log('点击了菜单项:', node.label, ', ID:', node.id);
  }
}
