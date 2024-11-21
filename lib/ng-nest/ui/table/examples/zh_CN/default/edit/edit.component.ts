import { Component } from '@angular/core';
import { XTableColumn, XTableComponent, XTableRow } from '@ng-nest/ui/table';
import { XGuid } from '@ng-nest/ui/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XLinkComponent } from '@ng-nest/ui/link';
import { XInputComponent } from '@ng-nest/ui/input';
import { XSelectComponent } from '@ng-nest/ui/select';
import { XSwitchComponent } from '@ng-nest/ui/switch';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ex-edit',
  imports: [
    FormsModule,
    XTableComponent,
    XButtonComponent,
    XLinkComponent,
    XInputComponent,
    XSelectComponent,
    XSwitchComponent
  ],
  templateUrl: './edit.component.html'
})
export class ExEditComponent {
  data = [
    { id: '11', name: '姓名1', position: '技术员', status: true },
    { id: '22', name: '姓名2', position: '销售', status: false },
    { id: '33', name: '姓名3', position: '经理', status: true },
    { id: '44', name: '姓名4', position: '总监', status: false }
  ];
  columns: XTableColumn[] = [
    { id: 'index', label: '序号', width: 85, left: 0, type: 'index' },
    { id: 'name', label: '用户', flex: 1 },
    { id: 'position', label: '职位', flex: 1 },
    { id: 'status', label: '启用', width: 100 },
    { id: 'actions', label: '操作', width: 100 }
  ];

  positionOptions = ['技术员', '销售', '经理', '总监', '生产员'];

  add() {
    this.data = [...this.data, { id: XGuid(), name: '', position: '', status: false }];
  }

  del(row: XTableRow) {
    const index = this.data.findIndex((x) => x.id === row.id);
    if (index >= 0) {
      this.data.splice(index, 1);
    }
  }
}
