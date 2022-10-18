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
    { id: 'index', label: '序号', flex: 0.5, left: 0, type: 'index' },
    { id: 'name', label: '用户', flex: 1 },
    { id: 'position', label: '职位', flex: 1 },
    { id: 'organization', label: '组织机构', flex: 1 }
  ];

  // onCheckedRow(row: XTableRow, source: XTransferSource) {
  //   let { checked, id } = row;
  //   if (checked) {
  //     if (!this.checkedIds.includes(id)) {
  //       this.checkedIds.push(id);
  //     }
  //   } else {
  //     if (this.checkedIds.includes(id)) {
  //       this.checkedIds.splice(
  //         this.checkedIds.findIndex((x) => x === id),
  //         1
  //       );
  //     }
  //   }
  //   source.checkedCount = this.checkedIds.length - this.rightCheckedRow.length;
  // }

  // onCheckedAll(prop: { [prop: string]: boolean }, _source: XTransferSource) {
  //   let { checked } = prop;

  //   for (let item of this.transferCom.left.list!) {
  //     if (!item.disabled) {
  //       if (checked) {
  //         this.checkedIds.push();
  //       }
  //     }
  //   }
  // }

  constructor(private service: TableService) {}
}
