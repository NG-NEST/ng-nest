import { Component } from '@angular/core';
import { RowclassService } from './rowclass.service';
import { XQuery } from '@ng-nest/ui/core';
import { XTableColumn, XTableComponent, XTableRow } from '@ng-nest/ui/table';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'ex-rowclass',
  imports: [XTableComponent],
  templateUrl: './rowclass.component.html',
  styleUrls: ['./rowclass.component.scss'],
  providers: [RowclassService]
})
export class ExRowclassComponent {
  data = (index: number, size: number, query: XQuery) => this.service.getList(index, size, query).pipe(delay(1000));
  columns: XTableColumn[] = [
    { id: 'checked', label: '', rowChecked: true, headChecked: true, type: 'checkbox', width: 60 },
    { id: 'index', label: '序号', flex: 0.5, left: 0, type: 'index' },
    { id: 'name', label: '用户', flex: 1.5, sort: true },
    { id: 'position', label: '职位', flex: 0.5, sort: true },
    { id: 'email', label: '邮箱', flex: 1 },
    { id: 'phone', label: '电话', flex: 1 },
    { id: 'organization', label: '组织机构', flex: 1, sort: true }
  ];

  rowClass = (row: XTableRow, index: number) => {
    return {
      even: index % 2 === 0,
      odd: index % 2 === 1,
      first: index === 0,
      inspector: row['position'] === '总监'
    };
  };

  constructor(private service: RowclassService) {}

  ngOnInit() {}
}
