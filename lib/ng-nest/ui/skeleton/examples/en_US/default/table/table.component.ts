import { Component } from '@angular/core';
import { XSkeletonComponent, XSkeletonRow } from '@ng-nest/ui/skeleton';

@Component({
  selector: 'ex-table',
  standalone: true,
  imports: [XSkeletonComponent],
  templateUrl: './table.component.html'
})
export class ExTableComponent {
  data: XSkeletonRow[] = [
    {
      flex: true,
      space: 1,
      cols: [
        { type: 'title', width: '3rem' },
        { type: 'title', span: 4 },
        { type: 'title', span: 6 },
        { type: 'title', span: 4 },
        { type: 'title', span: 10 }
      ]
    },
    {
      flex: true,
      space: 1,
      cols: [{ width: '3rem' }, { span: 4 }, { span: 6 }, { span: 4 }, { span: 10 }]
    },
    {
      flex: true,
      space: 1,
      cols: [{ width: '3rem' }, { span: 4 }, { span: 6 }, { span: 4 }, { span: 10 }]
    },
    {
      flex: true,
      space: 1,
      cols: [{ width: '3rem' }, { span: 4 }, { span: 6 }, { span: 4 }, { span: 10 }]
    },
    {
      flex: true,
      space: 1,
      cols: [{ width: '3rem' }, { span: 4 }, { span: 6 }, { span: 4 }, { span: 10 }]
    }
  ];
}
