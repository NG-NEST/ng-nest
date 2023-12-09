import { Component } from '@angular/core';
import { XTreeComponent, XTreeNode } from '@ng-nest/ui/tree';

@Component({
  selector: 'ex-line',
  standalone: true,
  imports: [XTreeComponent],
  templateUrl: './line.component.html'
})
export class ExLineComponent {
  data: XTreeNode[] = [
    { id: 1, label: 'First level 1' },
    { id: 2, label: 'First level 2' },
    { id: 3, label: 'First level 3' },
    { id: 5, label: 'Level 2 1-1', pid: 1 },
    { id: 6, label: 'Level 2 1-2', pid: 1 },
    { id: 7, label: 'Level 2 1-3', pid: 1 },
    { id: 8, label: 'Level 2 1-4', pid: 1 },
    { id: 9, label: 'Level 2 2-1', pid: 2 },
    { id: 10, label: 'Level 2 2-2', pid: 2 },
    { id: 11, label: 'Level 2 2-3', pid: 2 },
    { id: 12, label: 'Level 2 2-4', pid: 2 },
    { id: 13, label: 'Level 2 3-1', pid: 3 },
    { id: 14, label: 'Level 2 3-2', pid: 3 },
    { id: 15, label: 'Level 2 3-3', pid: 3 },
    { id: 16, label: 'Level 2 3-4', pid: 3 },
    { id: 21, label: 'Level 3 1-1-1', pid: 5 },
    { id: 22, label: 'Level 3 1-1-2', pid: 5 },
    { id: 23, label: 'Level 3 1-1-3', pid: 5 },
    { id: 24, label: 'Level 3 1-1-4', pid: 5 },
    { id: 25, label: 'Level 4 1-1-2-1', pid: 22 },
    { id: 26, label: 'Level 4 1-1-2-2', pid: 22 },
    { id: 27, label: 'Level 4 1-1-2-3', pid: 22 },
    { id: 28, label: 'Level 4 1-1-2-4', pid: 22 },
    { id: 29, label: 'Level 4 1-1-4-1', pid: 24 },
    { id: 30, label: 'Level 4 1-1-4-2', pid: 24 },
    { id: 31, label: 'Level 4 1-1-4-3', pid: 24 },
    { id: 32, label: 'Level 4 1-1-4-4', pid: 24 },
    { id: 33, label: 'Level 2 1-4-1', pid: 8 },
    { id: 34, label: 'Level 2 1-4-2', pid: 8 },
    { id: 35, label: 'Level 2 1-4-3', pid: 8 },
    { id: 36, label: 'Level 2 1-4-4', pid: 8 },
    { id: 37, label: 'Level 3 1-1-4-1', pid: 36 },
    { id: 38, label: 'Level 3 1-1-4-2', pid: 36 },
    { id: 39, label: 'Level 3 1-1-4-3', pid: 36 },
    { id: 40, label: 'Level 3 1-1-4-4', pid: 36 }
  ];
}
