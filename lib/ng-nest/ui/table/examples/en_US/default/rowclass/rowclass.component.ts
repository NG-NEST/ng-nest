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
    { id: 'index', label: 'serial', flex: 0.5, left: 0, type: 'index' },
    { id: 'name', label: 'user', flex: 1.5, sort: true },
    { id: 'position', label: 'position', flex: 0.5, sort: true },
    { id: 'email', label: 'mailbox', flex: 1 },
    { id: 'phone', label: 'phone', flex: 1 },
    { id: 'organization', label: 'organization', flex: 1, sort: true }
  ];

  rowClass = (row: XTableRow, index: number) => {
    return {
      even: index % 2 === 0,
      odd: index % 2 === 1,
      first: index === 0,
      inspector: row['position'] === 'Director'
    };
  };

  constructor(private service: RowclassService) {}

  ngOnInit() {}
}
