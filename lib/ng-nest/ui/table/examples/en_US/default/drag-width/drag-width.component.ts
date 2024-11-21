import { Component } from '@angular/core';
import { DragWidthService } from './drag-width.service';
import { XQuery } from '@ng-nest/ui/core';
import { XTableComponent, XTableColumn, XTableDragWidthEvent } from '@ng-nest/ui/table';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'ex-drag-width',
  imports: [XTableComponent],
  templateUrl: './drag-width.component.html',
  providers: [DragWidthService]
})
export class ExDragWidthComponent {
  size = 1000;
  data = (index: number, size: number, query: XQuery) => this.service.getList(index, size, query).pipe(delay(2000));
  columns: XTableColumn[] = [
    { id: 'index', label: 'serial', width: 100, left: 0, type: 'index' },
    {
      id: 'name',
      label: 'user',
      width: 200,
      sort: true,
      dragWidth: true,
      dragWidthStarted: (ev: XTableDragWidthEvent) => {
        console.log('dragWidthStarted', ev.column.width);
      },
      dragWidthMoved: (ev: XTableDragWidthEvent) => {
        console.log('dragWidthMoved', ev.column.width);
      },
      dragWidthEnded: (ev: XTableDragWidthEvent) => {
        console.log('dragWidthEnded', ev.column.width);
      }
    },
    { id: 'position', label: 'position', width: 300, sort: true, dragWidth: true },
    { id: 'email', label: 'mailbox', width: 300, dragWidth: true },
    { id: 'phone', label: 'phone', width: 300, dragWidth: true },
    { id: 'organization', label: 'organization', flex: 1, sort: true }
  ];

  constructor(private service: DragWidthService) {}

  ngOnInit() {}

  columnDragWidthStarted(ev: XTableDragWidthEvent) {
    console.log('columnDragWidthStarted', ev.column.width, ev.position);
  }

  columnDragWidthMoved(ev: XTableDragWidthEvent) {
    console.log('columnDragWidthMoved', ev.column.width, ev.position);
  }

  columnDragWidthEnded(ev: XTableDragWidthEvent) {
    console.log('columnDragWidthEnded', ev.column.width, ev.position);
  }
}
