import { Component } from '@angular/core';
import { XTableColumn, XTableComponent, XTableRow } from '@ng-nest/ui/table';
import { XGuid } from '@ng-nest/ui/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XLinkComponent } from '@ng-nest/ui/link';
import { CommonModule } from '@angular/common';
import { XInputComponent } from '@ng-nest/ui/input';
import { XSelectComponent } from '@ng-nest/ui/select';
import { XSwitchComponent } from '@ng-nest/ui/switch';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ex-edit',
  standalone: true,
  imports: [
    CommonModule,
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
    { id: '11', name: 'name 1', position: 'Technician', status: true },
    { id: '22', name: 'name 2', position: 'Sales', status: false },
    { id: '33', name: 'name 3', position: 'Manager', status: true },
    { id: '44', name: 'name 4', position: 'Director', status: false }
  ];
  columns: XTableColumn[] = [
    { id: 'index', label: 'serial', width: 85, left: 0, type: 'index' },
    { id: 'name', label: 'user', flex: 1 },
    { id: 'position', label: 'position', flex: 1 },
    { id: 'status', label: 'enabled', width: 100 },
    { id: 'actions', label: 'actions', width: 100 }
  ];

  positionOptions = ['Technician', 'Sales', 'Manager', 'Director', 'Production'];

  constructor() {}

  ngOnInit() {}

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
