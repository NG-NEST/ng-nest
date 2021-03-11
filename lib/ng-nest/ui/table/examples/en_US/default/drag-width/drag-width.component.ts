import { Component } from '@angular/core';
import { DragWidthService } from './drag-width.service';
import { XQuery } from '@ng-nest/ui/core';
import { XTableColumn } from '@ng-nest/ui/table';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'ex-drag-width',
  templateUrl: './drag-width.component.html',
  providers: [DragWidthService]
})
export class ExBorderedComponent {
  size = 1000;
  data = (index: number, size: number, query: XQuery) => this.service.getList(index, size, query).pipe(delay(2000));
  columns: XTableColumn[] = [
    { id: 'index', label: 'serial', width: 100, left: 0, type: 'index' },
    { id: 'name', label: 'user', width: 200, sort: true, dragWidth: true },
    { id: 'position', label: 'position', width: 300, sort: true, dragWidth: true },
    { id: 'email', label: 'mailbox', width: 300, dragWidth: true },
    { id: 'phone', label: 'phone', width: 300, dragWidth: true },
    { id: 'organization', label: 'organization', flex: 1, sort: true }
  ];

  constructor(private service: DragWidthService) {}

  ngOnInit() {}
}
