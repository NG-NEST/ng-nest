import { Component, signal } from '@angular/core';
import { XContextmenuNode, XContextmenuComponent } from '@ng-nest/ui/contextmenu';

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html',
  imports: [XContextmenuComponent]
})
export class ExDefaultComponent {
  data = signal<XContextmenuNode[]>([
    { id: '1', label: 'Copy', icon: 'fto-copy' },
    { id: '2', label: 'Paste', icon: 'fto-clipboard' },
    { id: '3', label: 'Cut', icon: 'fto-scissors' },
    { id: '4', label: 'Delete', icon: 'fto-trash' }
  ]);

  onNodeClick(node: XContextmenuNode) {
    console.log('Menu item clicked:', node.label);
  }
}
