import { Component, signal, viewChild, ElementRef } from '@angular/core';
import { XContextmenuNode, XContextmenuComponent } from '@ng-nest/ui/contextmenu';

@Component({
  selector: 'ex-portal',
  templateUrl: './portal.component.html',
  imports: [XContextmenuComponent]
})
export class ExPortalComponent {
  imgElement = viewChild<ElementRef>('img');
  img2 = viewChild<ElementRef>('img2');
  img3 = viewChild<ElementRef>('img3');
  
  data = signal<XContextmenuNode[]>([
    { id: '1', label: 'Copy', icon: 'fto-copy' },
    { id: '2', label: 'Paste', icon: 'fto-clipboard' },
    { id: '3', label: 'Cut', icon: 'fto-scissors' },
    { id: '4', label: 'Delete', icon: 'fto-trash' },
    { id: '5', label: 'Select All', icon: 'fto-check-square' },
    { id: '6', label: 'Find', icon: 'fto-search' },
    { id: '7', label: 'Replace', icon: 'fto-refresh-cw' }
  ]);

  onNodeClick(node: XContextmenuNode) {
    console.log('Menu item clicked:', node.label);
  }
}
