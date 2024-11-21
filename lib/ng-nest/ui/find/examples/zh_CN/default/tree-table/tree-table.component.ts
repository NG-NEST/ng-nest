import { Component, signal } from '@angular/core';
import type { XQuery } from '@ng-nest/ui/core';
import type { XTableColumn, XTableRow } from '@ng-nest/ui/table';
import { TreeTableService } from './tree-table.service';
import { TreeService } from './tree.service';
import { FormsModule } from '@angular/forms';
import { XFindComponent } from '@ng-nest/ui/find';

@Component({
  selector: 'ex-tree-table',
  imports: [FormsModule, XFindComponent],
  templateUrl: './tree-table.component.html',
  styleUrls: ['./tree-table.component.scss'],
  providers: [TreeTableService, TreeService]
})
export class ExTreeTableComponent {
  model = signal<XTableRow | null>(null);
  modelMultiple = signal<XTableRow[]>([]);
  constructor(
    public treeTableService: TreeTableService,
    public treeService: TreeService
  ) {}

  tableColumns = signal<XTableColumn[]>([
    { id: 'index', label: '序号', type: 'index', width: 80 },
    { id: 'label', label: '用户', flex: 1, sort: true },
    { id: 'position', label: '职位', flex: 1, sort: true },
    { id: 'organization', label: '组织机构', flex: 1, sort: true }
  ]);
  tableData = signal((index: number, size: number, query: XQuery) => this.treeTableService.getList(index, size, query));
}
