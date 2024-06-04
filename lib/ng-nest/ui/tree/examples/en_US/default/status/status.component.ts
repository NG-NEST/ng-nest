import { Component, signal } from '@angular/core';
import { XTreeComponent, XTreeNode } from '@ng-nest/ui/tree';

@Component({
  selector: 'ex-status',
  standalone: true,
  imports: [XTreeComponent],
  templateUrl: './status.component.html'
})
export class ExStatusComponent {
  data = signal<XTreeNode[]>([
    { id: 1, label: 'First level 1' },
    { id: 2, label: 'First level 2' },
    { id: 3, label: 'First level 3' },
    { id: 5, label: 'Level 2 1-1', pid: 1 },
    { id: 6, label: 'Level 2 1-2', pid: 1, disabled: true },
    { id: 7, label: 'Level 2 1-3', pid: 1 },
    { id: 8, label: 'Level 2 1-4', pid: 1, disabled: true },
    { id: 9, label: 'Level 2 2-1', pid: 2 },
    { id: 10, label: 'Level 2 2-2', pid: 2 },
    { id: 11, label: 'Level 2 2-3', pid: 2 },
    { id: 12, label: 'Level 2 2-4', pid: 2, disabled: true },
    { id: 13, label: 'Level 2 3-1', pid: 3 },
    { id: 14, label: 'Level 2 3-2', pid: 3 },
    { id: 15, label: 'Level 2 3-3', pid: 3, disabled: true },
    { id: 16, label: 'Level 2 3-4', pid: 3 },
    { id: 21, label: 'Level 3 1-1-1', pid: 5 },
    { id: 22, label: 'Level 3 1-1-2', pid: 5 },
    { id: 23, label: 'Level 3 1-1-3', pid: 5 },
    { id: 24, label: 'Level 3 1-1-4', pid: 5 }
  ]);
}
