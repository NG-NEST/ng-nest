import { Component } from '@angular/core';
import { HeadTemplateService } from './head-template.service';
import { XQuery } from '@ng-nest/ui/core';
import { XTableColumn, XTableComponent } from '@ng-nest/ui/table';
import { delay } from 'rxjs/operators';
import { XIconComponent } from '@ng-nest/ui/icon';

@Component({
  selector: 'ex-head-tempalte',
  standalone: true,
  imports: [XTableComponent, XIconComponent],
  templateUrl: './head-template.component.html',
  providers: [HeadTemplateService]
})
export class ExHeadTemplateComponent {
  data = (index: number, size: number, query: XQuery) => this.service.getList(index, size, query).pipe(delay(1000));
  columns: XTableColumn[] = [
    { id: 'index', label: 'serial', flex: 0.5, left: 0, type: 'index' },
    { id: 'name', label: 'user', flex: 1.5, sort: true },
    { id: 'position', label: 'position', flex: 0.5, sort: true },
    { id: 'email', label: 'mailbox', flex: 1 },
    { id: 'phone', label: 'phone', flex: 1 },
    { id: 'organization', label: 'organization', flex: 1, sort: true }
  ];

  constructor(private service: HeadTemplateService) {}

  ngOnInit() {}
}
