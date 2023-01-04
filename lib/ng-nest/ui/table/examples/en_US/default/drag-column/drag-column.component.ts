import { Component } from '@angular/core';
import { DragColumnService } from './drag-column.service';
import { XQuery } from '@ng-nest/ui/core';
import { XTableColumn } from '@ng-nest/ui/table';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'ex-drag-column',
  templateUrl: './drag-column.component.html',
  providers: [DragColumnService]
})
export class ExDragColumnComponent {
  data = (index: number, size: number, query: XQuery) => this.service.getList(index, size, query).pipe(delay(500));
  columns: XTableColumn[] = [
    { id: 'index', label: 'serial', flex: 0.5, left: 0, type: 'index' },
    { id: 'name', label: 'user', flex: 1.5, sort: true, dragColumn: true },
    { id: 'position', label: 'position', flex: 0.5, sort: true, dragColumn: true },
    { id: 'email', label: 'mailbox', flex: 1, dragColumn: true },
    { id: 'phone', label: 'phone', flex: 1, dragColumn: true },
    { id: 'organization', label: 'organization', flex: 1, sort: true, dragColumn: true }
  ];

  constructor(private service: DragColumnService) {}

  ngOnInit() {}

  columnDragStarted(column: XTableColumn) {
    console.log('columnDragStarted', column);
  }

  columnDragEnded(column: XTableColumn) {
    console.log('columnDragEnded', column);
  }

  columnDropListDropped(columns: XTableColumn[]) {
    console.log('columnDropListDropped', columns);
  }
}
