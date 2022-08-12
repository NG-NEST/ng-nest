import { Component, ViewChild } from '@angular/core';
import { SearchService } from './search.service';
import { XQuery } from '@ng-nest/ui/core';
import { XTableColumn, XTableComponent } from '@ng-nest/ui/table';

@Component({
  selector: 'ex-search',
  templateUrl: './search.component.html',
  providers: [SearchService]
})
export class ExSearchComponent {
  @ViewChild('tableCom') tableCom!: XTableComponent;

  size = 1000;
  query: XQuery = { filter: [] };
  data = (index: number, size: number, query: XQuery) => this.service.getList(index, size, query);

  columns: XTableColumn[] = [
    { id: 'index', label: 'serial', width: 100, left: 0, type: 'index' },
    { id: 'name', label: 'user', width: 200, left: 100, sort: true },
    { id: 'position', label: 'position', width: 150, sort: true },
    { id: 'email', label: 'email', width: 150 },
    { id: 'phone', label: 'phone', width: 150 },
    { id: 'remark', label: 'description', flex: 1 },
    { id: 'organization', label: 'organization', width: 150, right: 0, sort: true }
  ];

  phone = null;
  name = null;
  position = null;
  organization = null;

  constructor(public service: SearchService) {}

  ngOnInit() {}

  change(val: string, prop: string) {
    if (val === null) return;
    let filter = this.query.filter!;
    let pfilter = filter.find((x) => x.field === prop);
    if (pfilter) {
      pfilter.value = val;
    } else {
      pfilter = { field: prop, value: val };
      filter = [...filter, pfilter];
      this.query.filter = filter;
    }
    this.tableCom.change(1);
  }
}
