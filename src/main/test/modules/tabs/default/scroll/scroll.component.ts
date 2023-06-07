import { Component } from '@angular/core';
import { ScrollService } from './scroll.service';
import { XQuery } from '@ng-nest/ui/core';
import { XTableColumn } from '@ng-nest/ui/table';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'ex-scroll',
  templateUrl: './scroll.component.html',
  providers: [ScrollService]
})
export class ExScrollComponent {
  size = 1000;
  data = (index: number, size: number, query: XQuery) => this.service.getList(index, size, query).pipe(delay(2000));
  columns: XTableColumn[] = [
    { id: 'index', label: '序号', width: 100, type: 'index' },
    { id: 'name', label: '用户', width: 200, dragColumn: true, sort: true },
    { id: 'position', label: '职位', width: 300, dragColumn: true, sort: true },
    { id: 'email', label: '邮箱', width: 300 },
    { id: 'phone', label: '电话', flex: 1 },
    { id: 'organization', label: '组织机构', width: 200, sort: true },
    { id: 'actions', label: '操作', width: 100 }
  ];

  constructor(private service: ScrollService) {}

  ngOnInit() {}
}
