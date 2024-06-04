import { Component, signal } from '@angular/core';
import { XQuery } from '@ng-nest/ui/core';
import { XTableColumn } from '@ng-nest/ui/table';
import { XTransferComponent } from '@ng-nest/ui/transfer';
import { TableService } from './table.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ex-table',
  standalone: true,
  imports: [FormsModule, XTransferComponent],
  templateUrl: './table.component.html',
  providers: [TableService]
})
export class ExTableComponent {
  value = signal(this.service.users.filter((x) => [2, 6, 13, 24].includes(Number(x.id))));
  data = signal((index: number, size: number, query: XQuery) => this.service.getList(index, size, query));
  columns = signal<XTableColumn[]>([
    { id: 'checked', label: '', rowChecked: true, headChecked: true, type: 'checkbox', width: 60 },
    { id: 'index', label: '序号', flex: 0.5, left: 0, type: 'index' },
    { id: 'name', label: '用户', flex: 1 },
    { id: 'position', label: '职位', flex: 1 }
  ]);

  constructor(private service: TableService) {}
}
