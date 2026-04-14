import { Component, signal } from '@angular/core';
import { XContextmenuNode, XContextmenuComponent } from '@ng-nest/ui/contextmenu';

@Component({
  selector: 'ex-tree',
  templateUrl: './tree.component.html',
  imports: [XContextmenuComponent]
})
export class ExTreeComponent {
  data = signal<XContextmenuNode[]>([
    {
      id: '1',
      label: 'File',
      icon: 'fto-file'
    },
    { id: '1-1', pid: '1', label: 'New' },
    { id: '1-2', pid: '1', label: 'Open' },
    { id: '1-3', pid: '1', label: 'Save' },
    {
      id: '2',
      label: 'Edit',
      icon: 'fto-edit',
      children: []
    },
    { id: '2-1', pid: '2', label: 'Undo' },
    { id: '2-2', pid: '2', label: 'Redo' },
    {
      id: '2-3',
      pid: '2',
      label: 'Clipboard'
    },
    { id: '2-3-1', pid: '2-3', label: 'Copy' },
    { id: '2-3-2', pid: '2-3', label: 'Paste' },
    { id: '2-3-3', pid: '2-3', label: 'Cut' },

    {
      id: '3',
      label: 'View',
      icon: 'fto-eye',
      children: []
    },
    { id: '3-1', pid: '3', label: 'Zoom In' },
    { id: '3-2', pid: '3', label: 'Zoom Out' },
    { id: '3-3', pid: '3', label: 'Actual Size' },
    { id: '4', label: 'Help', icon: 'fto-help-circle' }
  ]);

  onNodeClick(node: XContextmenuNode) {
    console.log('Menu item clicked:', node.label, ', ID:', node.id);
  }
}
