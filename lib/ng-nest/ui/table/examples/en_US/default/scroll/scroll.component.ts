import { Component } from '@angular/core';
import { ScrollService } from './scroll.service';
import { XQuery } from '@ng-nest/ui/core';
import { XTableColumn, XTableComponent } from '@ng-nest/ui/table';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'ex-scroll',
  imports: [XTableComponent],
  templateUrl: './scroll.component.html',
  providers: [ScrollService]
})
export class ExScrollComponent {
  size = 1000;
  data = (index: number, size: number, query: XQuery) => this.service.getList(index, size, query).pipe(delay(2000));
  columns: XTableColumn[] = [
    { id: 'index', label: 'serial', width: 100, left: 0, type: 'index' },
    { id: 'name', label: 'user', width: 200, sort: true },
    { id: 'position', label: 'position', width: 300, sort: true },
    { id: 'email', label: 'mailbox', width: 300 },
    { id: 'phone', label: 'phone', width: 300 },
    { id: 'organization', label: 'organization', flex: 1, sort: true }
  ];

  constructor(private service: ScrollService) {}

  ngOnInit() {}
}
