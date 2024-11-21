import { Component, signal } from '@angular/core';
import { XTableColumn, XTableComponent } from '@ng-nest/ui/table';
import { delay, of, tap } from 'rxjs';

@Component({
  selector: 'ex-array-data',
  imports: [XTableComponent],
  templateUrl: './array-data.component.html'
})
export class ExArrayDataComponent {
  index = signal(1);
  size = signal(20);
  total = signal(0);
  data = signal<any[]>([]);
  columns: XTableColumn[] = [
    { id: 'index', label: '序号', flex: 0.5, left: 0, type: 'index' },
    { id: 'name', label: '用户', flex: 1.5, sort: true },
    { id: 'position', label: '职位', flex: 0.5, sort: true },
    { id: 'email', label: '邮箱', flex: 1 },
    { id: 'phone', label: '电话', flex: 1 },
    { id: 'organization', label: '组织机构', flex: 1, sort: true }
  ];

  constructor() {}

  ngOnInit() {
    this.getTableData();
  }

  indexChange() {
    this.getTableData();
  }

  sizeChange() {
    this.index.set(1);
    this.getTableData();
  }

  getTableData() {
    console.log(this.index(), this.size());
    const start = (this.index() - 1) * this.size() + 1;
    const data = Array.from({ length: 20 }).map((_i, i) => ({
      id: start + i,
      name: '姓名' + start + i,
      position: '职位' + start + i,
      email: '邮箱' + start + i,
      phone: '手机' + start + i,
      organization: '组织机构' + start + i
    }));
    of(data)
      .pipe(
        delay(2000),
        tap((x) => {
          this.data.set(x);
          console.log(this.data());
        })
      )
      .subscribe();
  }
}
