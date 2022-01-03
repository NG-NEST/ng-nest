import { Component } from '@angular/core';
import { XData, XQuery } from '@ng-nest/ui/core';
import { XTableColumn, XTableRow } from '@ng-nest/ui/table';
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

  tableColumns: XTableColumn[] = [
    { id: 'index', label: 'serial no', type: 'index', width: 80 },
    { id: 'label', label: 'user', flex: 1, sort: true },
    { id: 'position', label: 'position', flex: 1, sort: true },
    { id: 'organization', label: 'organization', flex: 1, sort: true }
  ];
  tableData: XData<XTableRow> = (index: number, size: number, query: XQuery) => this.treeTableService.getList(index, size, query);
}
