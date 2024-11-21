import { Component } from '@angular/core';
import { HeaderService } from './header.service';
import { XQuery } from '@ng-nest/ui/core';
import { XTableColumn, XTableComponent } from '@ng-nest/ui/table';
import { delay } from 'rxjs/operators';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XIconComponent } from '@ng-nest/ui/icon';

@Component({
  selector: 'ex-header',
  imports: [XTableComponent, XButtonComponent, XIconComponent],
  templateUrl: './header.component.html',
  providers: [HeaderService]
})
export class ExHeaderComponent {
  data = (index: number, size: number, query: XQuery) => this.service.getList(index, size, query).pipe(delay(1000));
  columns: XTableColumn[] = [
    { id: 'index', label: 'serial', flex: 0.5, left: 0, type: 'index' },
    { id: 'name', label: 'user', flex: 1.5, sort: true },
    { id: 'position', label: 'position', flex: 0.5, sort: true },
    { id: 'email', label: 'email', flex: 1 },
    { id: 'phone', label: 'mailbox', flex: 1 },
    { id: 'organization', label: 'organization', flex: 1, sort: true }
  ];

  constructor(private service: HeaderService) {}

  ngOnInit() {}
}
