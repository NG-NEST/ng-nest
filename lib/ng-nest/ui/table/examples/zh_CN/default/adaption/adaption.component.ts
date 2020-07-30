import { Component } from '@angular/core';
import { AdaptionService, User } from './adaption.service';
import { XQuery, XSort } from '@ng-nest/ui/core';
import { XTableColumn } from '@ng-nest/ui/table';

@Component({
  selector: 'ex-adaption',
  templateUrl: './adaption.component.html',
  providers: [AdaptionService]
})
export class ExAdaptionComponent {
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
    { id: 'organization', label: '组织机构', flex: 1, sort: true }
  ];

  visible = false;

  constructor(private service: AdaptionService) {}

  ngOnInit() {}

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

  dialog() {
    this.getData();
    this.visible = true;
  }
}
