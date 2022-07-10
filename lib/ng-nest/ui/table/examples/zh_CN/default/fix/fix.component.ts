import { Component } from '@angular/core';
import { FixService } from './fix.service';
import { XQuery } from '@ng-nest/ui/core';
import { XTableColumn, XTableRow } from '@ng-nest/ui/table';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'ex-fix',
  templateUrl: './fix.component.html',
  providers: [FixService]
})
export class ExFixComponent {
  size = 1000;
  data = (index: number, size: number, query: XQuery) => this.service.getList(index, size, query).pipe(delay(2000));
  columns: XTableColumn[] = [
    { id: 'index', label: '序号', width: 100, left: 0, type: 'index' },
    { id: 'name', label: '用户', width: 100, left: 100, sort: true },
    { id: 'position', label: '职位', width: 150, sort: true },
    { id: 'email', label: '邮箱', width: 150 },
    { id: 'phone', label: '电话', flex: 1 },
    { id: 'organization', label: '组织机构', width: 100, right: 100, sort: true },
    { id: 'actions', label: '操作', width: 100, right: 0 }
  ];

  constructor(private service: FixService) {}

  ngOnInit() {}

  edit(row: XTableRow, column: XTableColumn) {
    console.log(row, column);
  }

  del(row: XTableRow, column: XTableColumn) {
    console.log(row, column);
  }
}
