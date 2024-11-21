import { Component, signal } from '@angular/core';
import { XQuery } from '@ng-nest/ui/core';
import { XTableColumn, XTableRow } from '@ng-nest/ui/table';
import { DefaultService } from './default.service';
import { FormsModule } from '@angular/forms';
import { XFindComponent } from '@ng-nest/ui/find';

@Component({
  selector: 'ex-default',
  imports: [FormsModule, XFindComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  providers: [DefaultService]
})
export class ExDefaultComponent {
  model = signal<XTableRow | null>(null);
  modelMultiple = signal<XTableRow[]>([]);
  constructor(private defaultService: DefaultService) {}

  tableColumns = signal<XTableColumn[]>([
    { id: 'index', label: 'Serial No', type: 'index', width: 80 },
    { id: 'label', label: 'user', flex: 1, sort: true },
    { id: 'position', label: 'position', flex: 1, sort: true },
    { id: 'organization', label: 'organization', flex: 1, sort: true }
  ]);
  tableData = signal((index: number, size: number, query: XQuery) => this.defaultService.getList(index, size, query));
}
