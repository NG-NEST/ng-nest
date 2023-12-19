import { Component, ViewChild } from '@angular/core';
import { SearchService } from './search.service';
import { XQuery } from '@ng-nest/ui/core';
import { XTableColumn, XTableComponent } from '@ng-nest/ui/table';
import { XInputComponent } from '@ng-nest/ui/input';
import { XSelectComponent } from '@ng-nest/ui/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ex-search',
  standalone: true,
  imports: [FormsModule, XTableComponent, XInputComponent, XSelectComponent],
  templateUrl: './search.component.html',
  providers: [SearchService]
})
export class ExSearchComponent {
  @ViewChild('tableCom') tableCom!: XTableComponent;

  size = 1000;
  query: XQuery = { filter: [] };
  data = (index: number, size: number, query: XQuery) => this.service.getList(index, size, query);

  columns: XTableColumn[] = [
    { id: 'index', label: '序号', width: 100, left: 0, type: 'index' },
    { id: 'name', label: '用户', width: 200, left: 100, sort: true },
    { id: 'position', label: '职位', width: 150, sort: true },
    { id: 'email', label: '邮箱', width: 150 },
    { id: 'phone', label: '电话', width: 150 },
    { id: 'remark', label: '备注', flex: 1 },
    { id: 'organization', label: '组织机构', width: 150, right: 0, sort: true }
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
