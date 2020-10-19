import { Component } from '@angular/core';
import { XQuery } from '@ng-nest/ui/core';
import { TableServiceTest } from './default.service';

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html',
  providers: [TableServiceTest]
})
export class ExDefaultComponent {
  model: any;
  modelMultiple: any;
  constructor(private tableService: TableServiceTest) {}

  table: { [property: string]: any } = {
    columns: [
      { id: 'index', label: 'Serial No', type: 'index', width: 80 },
      { id: 'label', label: 'user', flex: 1, sort: true },
      { id: 'position', label: 'position', flex: 1, sort: true },
      { id: 'organization', label: 'organization', flex: 1, sort: true }
    ],
    data: (index: number, size: number, query: XQuery) => this.tableService.getList(index, size, query)
  };
}
