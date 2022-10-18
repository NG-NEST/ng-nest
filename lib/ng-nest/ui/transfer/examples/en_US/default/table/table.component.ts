import { Component, ViewChild } from '@angular/core';
import { XQuery } from '@ng-nest/ui/core';
import { XTableColumn } from '@ng-nest/ui/table';
import { XTransferComponent } from '@ng-nest/ui/transfer';
import { TableService } from './table.service';

@Component({
  selector: 'ex-table',
  templateUrl: './table.component.html',
  providers: [TableService]
})
export class ExTableComponent {
  @ViewChild('transferCom') transferCom!: XTransferComponent;
  value = this.service.users.filter((x) => [2, 6, 13, 24].includes(Number(x.id)));
  data = (index: number, size: number, query: XQuery) => this.service.getList(index, size, query);
  columns: XTableColumn[] = [
    { id: 'checked', label: '', rowChecked: true, headChecked: true, type: 'checkbox', width: 60 },
    { id: 'index', label: 'serial', flex: 0.5, left: 0, type: 'index' },
    { id: 'name', label: 'user', flex: 1 },
    { id: 'position', label: 'position', flex: 1 },
    { id: 'organization', label: 'organization', flex: 1 }
  ];

  constructor(private service: TableService) {}
}
