import { Component, signal, viewChild, ElementRef } from '@angular/core';
import { XContextmenuNode, XContextmenuComponent } from '@ng-nest/ui/contextmenu';

@Component({
  selector: 'ex-size',
  templateUrl: './size.component.html',
  imports: [XContextmenuComponent]
})
export class ExSizeComponent {
  imgElement = viewChild<ElementRef>('img');
  img2 = viewChild<ElementRef>('img2');
  img3 = viewChild<ElementRef>('img3');
  
  data = signal<XContextmenuNode[]>([
    { id: '1', label: '复制', icon: 'fto-copy' },
    { id: '2', label: '粘贴', icon: 'fto-clipboard' },
    { id: '3', label: '剪切', icon: 'fto-scissors' },
    { id: '4', label: '删除', icon: 'fto-trash' }
  ]);

  onNodeClick(node: XContextmenuNode) {
    console.log('点击了菜单项:', node.label);
  }
}
