import { Component } from '@angular/core';
import { XSkeletonRow } from '@ng-nest/ui/skeleton';

@Component({
  selector: 'ex-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ExListComponent {
  loading = true;
  list = new Array(3).fill({});
  data: XSkeletonRow[] = [
    {
      flex: true,
      space: 1,
      cols: [
        { type: 'avatar', width: '3rem', height: '3rem' },
        {
          rows: [
            { cols: [{ type: 'title', width: '10rem' }] },
            { cols: [{}] },
            { cols: [{}] },
            { cols: [{ span: 16 }] },
            {
              space: 1,
              flex: true,
              cols: [
                { width: '3rem' },
                { width: '3rem' },
                { width: '3rem' },
                { type: 'transparent' },
                { width: '9rem' }
              ]
            }
          ]
        },
        { type: 'img', width: '10rem', height: '9rem' }
      ]
    }
  ];
}
