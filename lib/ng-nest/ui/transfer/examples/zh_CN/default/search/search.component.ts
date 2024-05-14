import { Component, viewChild } from '@angular/core';
import { XQuery } from '@ng-nest/ui/core';
import { XTableColumn } from '@ng-nest/ui/table';
import { XTransferComponent, XTransferNode } from '@ng-nest/ui/transfer';
import { SearchService } from './search.service';
import { FormsModule } from '@angular/forms';
import { XSelectComponent } from '@ng-nest/ui/select';
import { XInputComponent } from '@ng-nest/ui/input';

@Component({
  selector: 'ex-search',
  standalone: true,
  imports: [FormsModule, XTransferComponent, XInputComponent, XSelectComponent],
  templateUrl: './search.component.html',
  providers: [SearchService]
})
export class ExSearchComponent {
  // list
  value = [1, 3, 7];
  data: XTransferNode[] = Array.from({ length: 15 }).map((_x, i) => {
    return { id: i + 1, label: '备选项 ' + (i + 1), disabled: [3, 5, 9].indexOf(i + 1) >= 0 };
  });

  // tree
  modelTree = [1, 5, 7, 10];
  dataTree: XTransferNode[] = [
    { id: 1, label: '水果' },
    { id: 2, label: '蔬菜' },
    { id: 3, label: '饮料' },
    { id: 4, label: '苹果', pid: 1 },
    { id: 5, label: '香蕉', pid: 1 },
    { id: 6, label: '梨子', pid: 1 },
    { id: 7, label: '生菜', pid: 2 },
    { id: 8, label: '大白菜', pid: 2 },
    { id: 9, label: '韭菜', pid: 2 },
    { id: 10, label: '汽水', pid: 3 },
    { id: 11, label: '果汁', pid: 3 },
    { id: 12, label: '纯净水', pid: 3 },
    { id: 13, label: '小米蕉', pid: 5 },
    { id: 14, label: '仙人蕉', pid: 5 },
    { id: 15, label: '皇帝蕉', pid: 5 }
  ];

  // table
  transferCom = viewChild.required<XTransferComponent>('transferCom');
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
    { id: 'index', label: '序号', flex: 0.5, left: 0, type: 'index' },
    { id: 'name', label: '用户', flex: 1 },
    { id: 'position', label: '职位', flex: 1 }
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
    this.transferCom().leftTableCom()?.change(1);
  }

  constructor(public service: SearchService) {}
}
