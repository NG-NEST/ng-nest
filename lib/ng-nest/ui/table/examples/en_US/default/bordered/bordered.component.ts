import { Component } from '@angular/core';
import { BorderedService } from './bordered.service';
import { XQuery } from '@ng-nest/ui/core';
import { XTableColumn, XTableComponent } from '@ng-nest/ui/table';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'ex-bordered',
  imports: [XTableComponent],
  templateUrl: './bordered.component.html',
  providers: [BorderedService]
})
export class ExBorderedComponent {
  size = 1000;
  data = (index: number, size: number, query: XQuery) => this.service.getList(index, size, query).pipe(delay(2000));
  columns: XTableColumn[] = [
    { id: 'index', label: 'serial number', width: 100, left: 0, type: 'index' },
    { id: 'name', label: 'user', width: 200, sort: true },
    { id: 'position', label: 'position', width: 300, sort: true },
    { id: 'email', label: 'mailbox', width: 300 },
    { id: 'phone', label: 'phone', width: 300 },
    { id: 'organization', label: 'organization', flex: 1, sort: true }
  ];

  constructor(private service: BorderedService) {}

  ngOnInit() {}
}
