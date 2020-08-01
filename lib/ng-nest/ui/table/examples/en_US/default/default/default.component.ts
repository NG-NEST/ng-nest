import { Component } from '@angular/core';
import { DefaultService, User } from './default.service';
import { XQuery, XSort } from '@ng-nest/ui/core';
import { XTableColumn } from '@ng-nest/ui/table';

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html',
  providers: [DefaultService]
})
export class ExDefaultComponent {
  query: XQuery = {};
  index = 1;
  size = 10;
  total = 0;
  data: User[] = [];
  columns: XTableColumn[] = [
    { id: 'index', label: 'serial no', flex: 0.5, left: 0, type: 'index' },
    { id: 'name', label: 'user', flex: 1.5, sort: true },
    { id: 'position', label: 'position', flex: 0.5, sort: true },
    { id: 'email', label: 'email', flex: 1 },
    { id: 'phone', label: 'phone', flex: 1 },
    { id: 'organization', label: 'organization', flex: 1, sort: true }
  ];

  constructor(private service: DefaultService) {}

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
