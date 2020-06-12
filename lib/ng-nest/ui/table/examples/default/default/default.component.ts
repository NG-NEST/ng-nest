import { Component } from '@angular/core';
import { XTableColumn } from '@ng-nest/ui/table';
import { ExDefaultService, User } from './default.service';
import { XResultList } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html',
  styles: [
    `
      .header-name,
      .body-name {
        display: flex;
        align-items: center;
      }
      .header-name > span,
      .body-name > span {
        margin-left: 0.25rem;
      }
    `
  ],
  providers: [ExDefaultService]
})
export class ExDefaultComponent {
  constructor(public service: ExDefaultService) {}

  query = {};
  index = 1;
  size = 10;
  data: XResultList<User>;
  columns: XTableColumn[] = [
    { id: 'name', label: '用户', flex: 1.5, search: true, sort: true, action: true },
    { id: 'position', label: '职位', flex: 0.5, sort: true },
    { id: 'email', label: '邮箱', flex: 1 },
    { id: 'phone', label: '电话', flex: 1 },
    { id: 'organization', label: '组织机构', flex: 1, sort: true }
  ];

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.service.getList(this.index, this.size, this.query).subscribe((x) => {
      this.data = x;
    });
  }

  indexChange(index: number) {
    console.log(index);
    this.getData();
  }
}
