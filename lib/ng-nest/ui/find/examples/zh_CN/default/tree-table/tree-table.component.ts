import { Component } from '@angular/core';
import { XQuery } from '@ng-nest/ui/core';
import { TableServiceTest, TreeServiceTest } from './tree-table.service';

@Component({
  selector: 'ex-tree-table',
  templateUrl: './tree-table.component.html',
  providers: [TableServiceTest, TreeServiceTest]
})
export class ExTreeTableComponent {
  model: any;
  modelMultiple: any;
  constructor(public tableService: TableServiceTest, public treeService: TreeServiceTest) {}

  table: { [property: string]: any } = {
    columns: [
      { id: 'index', label: '序号', type: 'index', width: 80 },
      { id: 'label', label: '用户', flex: 1, sort: true },
      { id: 'position', label: '职位', flex: 1, sort: true },
      { id: 'organization', label: '组织机构', flex: 1, sort: true }
    ],
    data: (index: number, size: number, query: XQuery) => this.tableService.getList(index, size, query)
  };
}
