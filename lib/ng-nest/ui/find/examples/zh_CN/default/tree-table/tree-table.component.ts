import { Component } from '@angular/core';
import { XQuery } from '@ng-nest/ui/core';
import { TreeTableService } from './tree-table.service';
import { TreeService } from './tree.service';

@Component({
  selector: 'ex-tree-table',
  templateUrl: './tree-table.component.html',
  providers: [TreeTableService, TreeService]
})
export class ExTreeTableComponent {
  model: any;
  modelMultiple: any;
  constructor(public treeTableService: TreeTableService, public treeService: TreeService) {}

  table: { [property: string]: any } = {
    columns: [
      { id: 'index', label: '序号', type: 'index', width: 80 },
      { id: 'label', label: '用户', flex: 1, sort: true },
      { id: 'position', label: '职位', flex: 1, sort: true },
      { id: 'organization', label: '组织机构', flex: 1, sort: true }
    ],
    data: (index: number, size: number, query: XQuery) => this.treeTableService.getList(index, size, query)
  };
}
