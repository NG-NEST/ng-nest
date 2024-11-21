import { Component } from '@angular/core';
import { ConfigService } from './config.service';
import { XQuery } from '@ng-nest/ui/core';
import { XTableCellConfig, XTableColumn, XTableComponent } from '@ng-nest/ui/table';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'ex-config',
  imports: [XTableComponent],
  templateUrl: './config.component.html',
  providers: [ConfigService]
})
export class ExConfigComponent {
  data = (index: number, size: number, query: XQuery) => this.service.getList(index, size, query).pipe(delay(2000));

  columns: XTableColumn[] = [
    { id: 'index', label: 'serial', flex: 0.5, left: 0, type: 'index' },
    { id: 'name', label: 'user', flex: 1.5, sort: true },
    { id: 'position', label: 'position', flex: 1, sort: true },
    { id: 'email', label: 'mailbox', flex: 1 },
    { id: 'phone', label: 'phone', flex: 1 },
    { id: 'organization', label: 'organization', flex: 1, sort: true }
  ];

  cellConfig: XTableCellConfig = {
    thead: {
      cells: [
        { gridArea: '1 / 1 / 3 / 2', id: 'index' },
        { gridArea: '1 / 2 / 2 / 5', label: 'details' },
        { gridArea: '2 / 2 / 3 / 3', id: 'name' },
        { gridArea: '2 / 3 / 3 / 4', id: 'position' },
        { gridArea: '2 / 4 / 3 / 5', id: 'email' },
        { gridArea: '1 / 5 / 3 / 6', id: 'phone' },
        { gridArea: '1 / 6 / 3 / 7', id: 'organization' }
      ]
    },
    tbody: {
      cells: [
        { gridArea: '1 / 1', id: 'index' },
        { gridArea: '1 / 2', id: 'name' },
        { gridArea: '1 / 3', id: 'position' },
        { gridArea: '1 / 4', id: 'email' },
        { gridArea: '1 / 5', id: 'phone' },
        { gridArea: '1 / 6', id: 'organization' }
      ]
    }
  };

  constructor(private service: ConfigService) {}

  ngOnInit() {}
}
