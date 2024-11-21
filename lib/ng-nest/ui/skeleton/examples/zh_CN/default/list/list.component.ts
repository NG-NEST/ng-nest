import { NgStyle } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XAvatarComponent } from '@ng-nest/ui/avatar';
import { XColComponent, XRowComponent } from '@ng-nest/ui/layout';
import { XLinkComponent } from '@ng-nest/ui/link';
import { XSkeletonComponent, XSkeletonRow } from '@ng-nest/ui/skeleton';
import { XSwitchComponent } from '@ng-nest/ui/switch';

@Component({
  selector: 'ex-list',
  imports: [
    NgStyle,
    FormsModule,
    XSkeletonComponent,
    XSwitchComponent,
    XLinkComponent,
    XRowComponent,
    XColComponent,
    XAvatarComponent
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ExListComponent {
  loading = signal(true);
  list = signal([1, 2, 3]);
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
