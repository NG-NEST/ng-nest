import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XCascadeComponent, XCascadeNode } from '@ng-nest/ui/cascade';
import { XColComponent, XRowComponent } from '@ng-nest/ui/layout';

@Component({
  selector: 'ex-default',
  imports: [XRowComponent, XColComponent, FormsModule, XCascadeComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  model1 = signal<number | null>(null);
  model2 = signal<number>(22);
  model3 = signal<number>(9);
  data = signal<XCascadeNode[]>([
    { id: 1, label: 'AAAA' },
    { id: 2, label: 'BBBB' },
    { id: 3, label: 'CCCC' },
    { id: 4, label: 'DDDD' },
    { id: 5, label: 'AAAA-1', pid: 1 },
    { id: 6, label: 'AAAA-2', pid: 1 },
    { id: 7, label: 'AAAA-3', pid: 1 },
    { id: 8, label: 'AAAA-4', pid: 1 },
    { id: 9, label: 'BBBB-1', pid: 2 },
    { id: 10, label: 'BBBB-2', pid: 2 },
    { id: 11, label: 'BBBB-3', pid: 2 },
    { id: 12, label: 'BBBB-4', pid: 2 },
    { id: 13, label: 'CCCC-1', pid: 3 },
    { id: 14, label: 'CCCC-2', pid: 3 },
    { id: 15, label: 'CCCC-3', pid: 3 },
    { id: 16, label: 'CCCC-4', pid: 3 },
    { id: 17, label: 'DDDD-1', pid: 4 },
    { id: 18, label: 'DDDD-2', pid: 4 },
    { id: 19, label: 'DDDD-3', pid: 4 },
    { id: 20, label: 'DDDD-4', pid: 4 },
    { id: 21, label: 'AAAA-1-1', pid: 5 },
    { id: 22, label: 'AAAA-1-2', pid: 5 },
    { id: 23, label: 'AAAA-1-3', pid: 5 },
    { id: 24, label: 'AAAA-1-4', pid: 5 },
    { id: 25, label: 'AAAA-2-1', pid: 6 },
    { id: 26, label: 'AAAA-2-2', pid: 6 },
    { id: 27, label: 'AAAA-2-3', pid: 6 },
    { id: 28, label: 'AAAA-2-4', pid: 6 },
    { id: 29, label: 'AAAA-3-1', pid: 7 },
    { id: 30, label: 'AAAA-3-2', pid: 7 },
    { id: 31, label: 'AAAA-3-3', pid: 7 },
    { id: 32, label: 'AAAA-3-4', pid: 7 },
    { id: 33, label: 'AAAA-4-1', pid: 8 },
    { id: 34, label: 'AAAA-4-2', pid: 8 },
    { id: 35, label: 'AAAA-4-3', pid: 8 },
    { id: 36, label: 'AAAA-4-4', pid: 8 }
  ]);
}
