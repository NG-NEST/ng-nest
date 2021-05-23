import { Component } from '@angular/core';
import { XQuery } from '@ng-nest/ui/core';
import { DefaultService } from './default.service';

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html',
  providers: [DefaultService]
})
export class ExDefaultComponent {
  model: any;
  modelMultiple: any;
  constructor(private defaultService: DefaultService) {}

  table: { [property: string]: any } = {
    columns: [
      { id: 'index', label: '序号', type: 'index', width: 80 },
      { id: 'label', label: '用户', flex: 1, sort: true },
      { id: 'position', label: '职位', flex: 1, sort: true },
      { id: 'organization', label: '组织机构', flex: 1, sort: true }
    ],
    data: (index: number, size: number, query: XQuery) => this.defaultService.getList(index, size, query)
  };
}
