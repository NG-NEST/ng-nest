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
    { id: 'index', label: '序号', width: 100, left: 0, type: 'index' },
    { id: 'name', label: '用户', width: 200, sort: true, dragWidth: true },
    { id: 'position', label: '职位', width: 300, sort: true, dragWidth: true },
    { id: 'email', label: '邮箱', width: 300, dragWidth: true },
    { id: 'phone', label: '电话', width: 300, dragWidth: true },
    { id: 'organization', label: '组织机构', flex: 1, sort: true }
  ];

  constructor(private service: DragWidthService) {}

  ngOnInit() {}
}
