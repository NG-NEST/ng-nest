import { Component } from '@angular/core';
import { ScrollService, User } from './scroll.service';
import { XQuery, XSort } from '@ng-nest/ui/core';
import { XTableColumn } from '@ng-nest/ui/table';

@Component({
  selector: 'ex-scroll',
  templateUrl: './scroll.component.html',
  providers: [ScrollService]
})
export class ExScrollComponent {
  query: XQuery = {};
  index = 1;
  size = 1000;
  total = 0;
  data: User[] = [];
  columns: XTableColumn[] = [
    { id: 'index', label: '序号', width: 100, left: 0, type: 'index' },
    { id: 'name', label: '用户', width: 200, sort: true },
    { id: 'position', label: '职位', width: 300, sort: true },
    { id: 'email', label: '邮箱', width: 300 },
    { id: 'phone', label: '电话', width: 300 },
    { id: 'organization', label: '组织机构', width: 300, sort: true }
  ];

  constructor(private service: ScrollService) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.service.getList(this.index, this.size, this.query).subscribe((x) => {
      [this.data, this.total] = [x.list as User[], Number(x.total)];
    });
  }

  indexChange(index: number) {
    this.index = index;
    this.getData();
  }

  sortChange(sort: XSort[]) {
    this.query.sort = sort;
    this.getData();
  }
}
