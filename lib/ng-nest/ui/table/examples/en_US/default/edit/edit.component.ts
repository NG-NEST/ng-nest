import { Component } from '@angular/core';
import { XTableColumn, XTableRow } from '@ng-nest/ui/table';
import { guid } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-edit',
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
    { id: 'actions', label: 'actions', width: 100, right: 0 }
  ];

  positionOptions = ['Technician', 'Sales', 'Manager', 'Director', 'Production'];

  constructor() {}

  ngOnInit() {}

  add() {
    this.data = [...this.data, { id: guid(), name: '', position: '', status: false }];
  }

  del(row: XTableRow) {
    const index = this.data.findIndex((x) => x.id === row.id);
    if (index >= 0) {
      this.data.splice(index, 1);
    }
  }
}
