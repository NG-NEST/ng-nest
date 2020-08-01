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

  table: { [prop: string]: any } = {
    columns: [
      { id: 'index', label: 'serial no', type: 'index', width: 80 },
      { id: 'label', label: 'user', flex: 1, sort: true },
      { id: 'position', label: 'position', flex: 1, sort: true },
      { id: 'organization', label: 'organization', flex: 1, sort: true }
    ],
    data: (index: number, size: number, query: XQuery) => this.tableService.getList(index, size, query)
  };
}
