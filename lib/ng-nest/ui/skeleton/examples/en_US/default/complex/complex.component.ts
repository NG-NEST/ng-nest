import { Component, signal } from '@angular/core';
import { XSkeletonComponent, XSkeletonRow } from '@ng-nest/ui/skeleton';

@Component({
  selector: 'ex-complex',
  imports: [XSkeletonComponent],
  templateUrl: './complex.component.html'
})
export class ExComplexComponent {
  data = signal<XSkeletonRow[]>([
    {
      flex: true,
      space: '1rem',
      cols: [
        { type: 'avatar', width: '3rem', height: '3rem' },
        {
          rows: [
            { cols: [{ type: 'title', width: '10rem' }] },
            { cols: [{}] },
            { cols: [{}] },
            { cols: [{ span: 16 }] },
            {
              space: '1rem',
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
  ]);
}
