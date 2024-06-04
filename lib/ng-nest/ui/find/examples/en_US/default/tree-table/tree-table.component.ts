import { Component, signal } from '@angular/core';
import { XQuery } from '@ng-nest/ui/core';
import { XTableColumn, XTableRow } from '@ng-nest/ui/table';
import { TreeTableService } from './tree-table.service';
import { TreeService } from './tree.service';
import { FormsModule } from '@angular/forms';
import { XFindComponent } from '@ng-nest/ui/find';

@Component({
  selector: 'ex-tree-table',
  standalone: true,
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
    { id: 'index', label: 'serial no', type: 'index', width: 80 },
    { id: 'label', label: 'user', flex: 1, sort: true },
    { id: 'position', label: 'position', flex: 1, sort: true },
    { id: 'organization', label: 'organization', flex: 1, sort: true }
  ]);
  tableData = signal((index: number, size: number, query: XQuery) => this.treeTableService.getList(index, size, query));
}
