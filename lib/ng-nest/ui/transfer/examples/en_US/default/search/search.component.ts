import { Component, ViewChild } from '@angular/core';
import { XQuery } from '@ng-nest/ui/core';
import { XTableColumn } from '@ng-nest/ui/table';
import { XTransferComponent, XTransferNode } from '@ng-nest/ui/transfer';
import { SearchService } from './search.service';

@Component({
  selector: 'ex-search',
  templateUrl: './search.component.html',
  providers: [SearchService]
})
export class ExSearchComponent {
  // list
  value = [1, 3, 7];
  data: XTransferNode[] = Array.from({ length: 15 }).map((_x, i) => {
    return { id: i + 1, label: 'Alternative ' + (i + 1), disabled: [3, 5, 9].indexOf(i + 1) >= 0 };
  });

  // tree
  modelTree = [1, 5, 7, 10];
  dataTree: XTransferNode[] = [
    { id: 1, label: 'Fruit' },
    { id: 2, label: 'Vegetable' },
    { id: 3, label: 'Drink' },
    { id: 4, label: 'Apple', pid: 1 },
    { id: 5, label: 'Banana', pid: 1 },
    { id: 6, label: 'Pear', pid: 1 },
    { id: 7, label: 'Lettuce', pid: 2 },
    { id: 8, label: 'Cabbage', pid: 2 },
    { id: 9, label: 'Leek', pid: 2 },
    { id: 10, label: 'Soda', pid: 3 },
    { id: 11, label: 'Juice', pid: 3 },
    { id: 12, label: 'Purified water', pid: 3 },
    { id: 13, label: 'Millet banana', pid: 5 },
    { id: 14, label: 'Canna edulis', pid: 5 },
    { id: 15, label: 'Emperor banana', pid: 5 }
  ];

  // table
  @ViewChild('transferCom') transferCom!: XTransferComponent;
  query: XQuery = { filter: [] };
  name = null;
  position = null;
  organization = null;
  valueTable = this.service.users.filter((x) => [2, 6, 13, 24].includes(Number(x.id)));
  dataTable = (index: number, size: number, query: XQuery) => {
    console.log(index, size, query);
    return this.service.getList(index, size, query);
  };
  columns: XTableColumn[] = [
    { id: 'checked', label: '', rowChecked: true, headChecked: true, type: 'checkbox', width: 60 },
    { id: 'index', label: 'serial', flex: 0.5, left: 0, type: 'index' },
    { id: 'name', label: 'user', flex: 1 },
    { id: 'position', label: 'position', flex: 1 }
  ];
  change(val: string, prop: string) {
    if (val === null) return;
    let filter = this.query.filter!;
    let pfilter = filter.find((x) => x.field === prop);
    if (pfilter) {
      pfilter.value = val;
    } else {
      pfilter = { field: prop, value: val };
      filter = [...filter, pfilter];
      this.query.filter = filter;
    }
    this.transferCom.leftTableCom?.change(1);
  }

  constructor(public service: SearchService) {}
}
