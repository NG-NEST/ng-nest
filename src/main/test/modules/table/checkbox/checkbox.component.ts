import { Component } from '@angular/core';
import { CheckboxService, User } from './checkbox.service';
import { XGroupItem, XQuery, XResultList } from '@ng-nest/ui/core';
import { XTableColumn, XTableHeadCheckbox, XTableRow } from '@ng-nest/ui/table';
import { delay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'ex-checkbox',
  templateUrl: './checkbox.component.html',
  providers: [CheckboxService]
})
export class ExCheckboxComponent {
  data!: (index: number, size: number, query: XQuery) => Observable<XResultList<User | XGroupItem>>;
  columns: XTableColumn[] = [];

  checkedRows: XTableRow[] = [];

  constructor(private service: CheckboxService) {}

  ngOnInit() {
    setTimeout(() => {
      this.data = (index: number, size: number, query: XQuery) => this.service.getList(index, size, query).pipe(delay(1000));
      this.columns = [
        { id: 'checked', label: '', rowChecked: true, headChecked: true, type: 'checkbox', width: 60 },
        { id: 'index', label: '序号', flex: 0.5, left: 0, type: 'index' },
        { id: 'name', label: '用户', flex: 1.5, sort: true },
        { id: 'position', label: '职位', flex: 0.5, sort: true },
        { id: 'email', label: '邮箱', flex: 1 },
        { id: 'phone', label: '电话', flex: 1 },
        { id: 'organization', label: '组织机构', flex: 1, sort: true }
      ];
    }, 1000);
  }

  setCheckedRows(checked: boolean, row: XTableRow) {
    if (checked) {
      if (!this.checkedRows.some((x) => x.id === row.id)) {
        this.checkedRows.push(row);
      }
    } else {
      if (this.checkedRows.some((x) => x.id === row.id)) {
        let index = this.checkedRows.findIndex((x) => x.id === row.id);
        this.checkedRows.splice(index, 1);
      }
    }
  }

  headCheckboxChange(headCheckbox: XTableHeadCheckbox) {
    // checked 属性来源于定义的 id 列
    const checked = headCheckbox.checkbox['checked'];
    for (let row of headCheckbox.rows) {
      this.setCheckedRows(checked, row);
    }

    console.log(this.checkedRows);
  }

  bodyCheckboxChange(row: XTableRow) {
    // checked 属性来源于定义的 id 列
    this.setCheckedRows(row['checked'], row);

    console.log(this.checkedRows);
  }
}