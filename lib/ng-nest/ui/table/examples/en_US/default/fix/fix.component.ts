import { Component } from '@angular/core';
import { FixService } from './fix.service';
import { XQuery } from '@ng-nest/ui/core';
import { XTableColumn, XTableComponent, XTableRow } from '@ng-nest/ui/table';
import { delay } from 'rxjs/operators';
import { XLinkComponent } from '@ng-nest/ui/link';

@Component({
  selector: 'ex-fix',
  standalone: true,
  imports: [XTableComponent, XLinkComponent],
  templateUrl: './fix.component.html',
  providers: [FixService]
})
export class ExFixComponent {
  size = 1000;
  data = (index: number, size: number, query: XQuery) => this.service.getList(index, size, query).pipe(delay(2000));
  columns: XTableColumn[] = [
    { id: 'index', label: 'serial', width: 100, left: 0, type: 'index' },
    { id: 'name', label: 'user', width: 100, left: 100, sort: true },
    { id: 'position', label: 'position', width: 150, sort: true },
    { id: 'email', label: 'email', width: 150 },
    { id: 'phone', label: 'mailbox', flex: 1 },
    { id: 'organization', label: 'organization', width: 100, right: 100, sort: true },
    { id: 'actions', label: 'actions', width: 100, right: 0 }
  ];

  constructor(private service: FixService) {}

  ngOnInit() {}

  edit(row: XTableRow, column: XTableColumn) {
    console.log(row, column);
  }

  del(row: XTableRow, column: XTableColumn) {
    console.log(row, column);
  }
}
