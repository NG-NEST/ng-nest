import { Component } from '@angular/core';
import { XData, XQuery } from '@ng-nest/ui/core';
import { XTableColumn, XTableRow } from '@ng-nest/ui/table';
import { DefaultService } from './default.service';
import { FormsModule } from '@angular/forms';
import { XFindComponent } from '@ng-nest/ui/find';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [FormsModule, XFindComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  providers: [DefaultService]
})
export class ExDefaultComponent {
  model: any;
  modelMultiple: any;
  constructor(private defaultService: DefaultService) {}

  tableColumns: XTableColumn[] = [
    { id: 'index', label: '序号', type: 'index', width: 80 },
    { id: 'label', label: '用户', flex: 1, sort: true },
    { id: 'position', label: '职位', flex: 1, sort: true },
    { id: 'organization', label: '组织机构', flex: 1, sort: true }
  ];
  tableData: XData<XTableRow> = (index: number, size: number, query: XQuery) =>
    this.defaultService.getList(index, size, query);
}
