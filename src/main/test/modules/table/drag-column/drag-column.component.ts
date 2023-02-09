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
    { id: 'index', label: '序号', width: 100, left: 0, type: 'index' },
    { id: 'name', label: '用户', width: 100, sort: true, dragColumn: true },
    { id: 'position', label: '职位', width: 200, sort: true, dragColumn: true, dragWidth: true },
    { id: 'email', label: '邮箱', width: 200, dragColumn: true },
    { id: 'phone', label: '电话', width: 200, dragColumn: true },
    { id: 'organization', label: '组织机构', flex: 1, sort: true, dragColumn: true }
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
