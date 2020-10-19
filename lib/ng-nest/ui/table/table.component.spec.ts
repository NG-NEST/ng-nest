import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XTableComponent } from './table.component';
import { Component, DebugElement, Injectable, ChangeDetectorRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XTableModule } from '@ng-nest/ui/table';
import { FormsModule } from '@angular/forms';
import { XTablePrefix, XTableColumn } from './table.property';
import { XRepositoryAbstract, XQuery, XResultList, XGroupItem, XFilter, chunk, groupBy, XSort, XId } from '@ng-nest/ui/core';
import { Observable, interval } from 'rxjs';
import { map as rxjsMap, delay, tap } from 'rxjs/operators';
import { XIconModule } from '@ng-nest/ui/icon';
import { XAvatarModule } from '@ng-nest/ui/avatar';
import { XDialogModule } from '@ng-nest/ui/dialog';
import { XButtonModule } from '@ng-nest/ui/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { map, orderBy } from 'lodash';
import { XThemeModule } from '@ng-nest/ui/theme';

describe(XTablePrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, XThemeModule, FormsModule, XTableModule, XIconModule, XAvatarModule, XDialogModule, XButtonModule],
      declarations: [TestXTableComponent, TestXTableScrollComponent, TestXTableAdaptionComponent, TestXTableFunctionComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXTableComponent>;
    let table: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXTableComponent);
      fixture.detectChanges();
      table = fixture.debugElement.query(By.directive(XTableComponent));
    });
    it('should create.', () => {
      expect(table).toBeDefined();
    });
  });
  describe(`scroll.`, () => {
    let fixture: ComponentFixture<TestXTableScrollComponent>;
    let table: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXTableScrollComponent);
      fixture.detectChanges();
      table = fixture.debugElement.query(By.directive(XTableComponent));
    });
    it('should create.', () => {
      expect(table).toBeDefined();
    });
  });
  describe(`adaption.`, () => {
    let fixture: ComponentFixture<TestXTableAdaptionComponent>;
    let table: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXTableAdaptionComponent);
      fixture.detectChanges();
      table = fixture.debugElement.query(By.directive(XTableComponent));
    });
    it('should create.', () => {
      expect(table).toBeDefined();
    });
  });
  describe(`observable.`, () => {
    let fixture: ComponentFixture<TestXTableFunctionComponent>;
    let table: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXTableFunctionComponent);
      fixture.detectChanges();
      table = fixture.debugElement.query(By.directive(XTableComponent));
    });
    it('should create.', () => {
      expect(table).toBeDefined();
    });
  });
});

@Injectable()
class UsersServiceTest extends XRepositoryAbstract {
  organizations = ['制造中心', '研发中心', '财务中心', '营销中心', '行政中心'];
  positions = ['技术员', '销售', '经理', '总监', '生产员'];
  users: User[] = Array.from({ length: 10000 }).map((x, i) => {
    i++;
    return {
      id: i,
      name: '姓名' + i,
      position: this.positions[Math.floor(Math.random() * 10 + 1) % 5],
      email: '邮箱' + i,
      phone: '手机' + i,
      organization: this.organizations[Math.floor(Math.random() * 10 + 1) % 5]
    };
  });

  getList(index: number, size: number, query?: XQuery): Observable<XResultList<User | XGroupItem>> {
    return new Observable((x) => {
      let data: User[] | XGroupItem[] = [];
      data = this.setFilter(this.users, query?.filter as XFilter[]);
      if (query?.group) {
        data = this.setGroup(data, query.group);
      }
      if (query?.sort) {
        data = this.setSort(data, query.sort);
      }
      let chunks = chunk(data, size);
      if ((index as number) <= chunks.length) {
        x.next({ total: data.length, list: chunks[index - 1] });
      } else {
        x.next({ total: data.length, list: [] });
      }
      x.complete();
    });
  }
  get(id: number | string): Observable<User> {
    return new Observable();
  }
  post(entity: User): Observable<User> {
    return new Observable();
  }
  put(entity: User): Observable<User> {
    return new Observable();
  }
  delete(id: number | string): Observable<boolean> {
    return new Observable();
  }

  private setFilter(data: User[], filters: XFilter[]): User[] {
    let result = data;
    if (filters && filters.length > 0) {
      filters.forEach((x) => {
        result = result.filter((y) => y[x.field].indexOf(x.value) >= 0);
      });
    }
    return result;
  }

  private setGroup(data: User[], group: string): XGroupItem[] {
    return map(groupBy(data, group), (value, key) => {
      let groupItem: XGroupItem = { id: key, count: value.length };
      groupItem[group] = key;
      return groupItem;
    });
  }

  private setSort(data: User[] | XGroupItem[], sort: XSort[]): User[] | XGroupItem[] {
    return orderBy(
      data,
      map(sort, (x) => x.field),
      map(sort, (x) => x.value) as ('desc' | 'asc')[]
    ) as User[] | XGroupItem[];
  }
}

interface User extends XId {
  name?: string;
  account?: string;
  password?: string;
  email?: string;
  phone?: string;
  organization?: string;
  [property: string]: any;
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <div class="row">
      <x-table
        [columns]="columns"
        [data]="data"
        [(index)]="index"
        [(size)]="size"
        [total]="total"
        (indexChange)="indexChange($event)"
        (sortChange)="sortChange($event)"
      >
      </x-table>
    </div>
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      .row {
        padding: 1rem;
      }
      .row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ],
  providers: [UsersServiceTest]
})
class TestXTableComponent {
  query: XQuery = {};
  index = 1;
  size = 10;
  total = 0;
  data: User[] = [];
  columns: XTableColumn[] = [
    { id: 'index', label: '序号', flex: 0.5, left: 0, type: 'index' },
    { id: 'name', label: '用户', flex: 1.5, sort: true },
    { id: 'position', label: '职位', flex: 0.5, sort: true },
    { id: 'email', label: '邮箱', flex: 1 },
    { id: 'phone', label: '电话', flex: 1 },
    { id: 'organization', label: '组织机构', flex: 1, sort: true }
  ];

  constructor(private service: UsersServiceTest, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.getData();
  }

  ngAfterViewInit() {
    interval(10).subscribe(() => this.cdr.detectChanges());
  }

  getData() {
    this.service.getList(this.index, this.size, this.query).subscribe((x) => {
      [this.data, this.total] = [x.list as User[], Number(x.total)];
      this.cdr.detectChanges();
    });
  }

  indexChange(index: number) {
    this.index = index;
    this.getData();
  }

  sortChange(sort: XSort[]) {
    this.query.sort = sort;
    this.getData();
  }
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <div class="row">
      <x-table [columns]="columns" [data]="data" [size]="1000" [bodyHeight]="420" [adaptionHeight]="200" virtualScroll loading> </x-table>
    </div>
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      .row {
        padding: 1rem;
      }
      .row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ],
  providers: [UsersServiceTest]
})
class TestXTableScrollComponent {
  data = (index: number, size: number, query: XQuery) => this.service.getList(index, size, query).pipe(delay(2000));
  columns: XTableColumn[] = [
    { id: 'index', label: '序号', width: 100, left: 0, type: 'index' },
    { id: 'name', label: '用户', width: 200, sort: true },
    { id: 'position', label: '职位', width: 300, sort: true },
    { id: 'email', label: '邮箱', width: 300 },
    { id: 'phone', label: '电话', width: 300 },
    { id: 'organization', label: '组织机构', flex: 1, sort: true }
  ];

  constructor(private service: UsersServiceTest, private cdr: ChangeDetectorRef) {}

  ngOnInit() {}
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-button (click)="dialog()">弹框表格自适应</x-button>
    <x-dialog
      title="弹框表格自适应(缩放浏览器窗口查看效果)"
      width="80%"
      height="80%"
      [(visible)]="visible"
      (close)="close()"
      (cancel)="close()"
      (confirm)="close()"
    >
      <x-table
        [columns]="columns"
        [data]="data"
        [(index)]="index"
        [(size)]="size"
        [total]="total"
        [bodyHeight]="420"
        [adaptionHeight]="104"
        [docPercent]="0.8"
        (indexChange)="indexChange($event)"
        (sortChange)="sortChange($event)"
        virtualScroll
      >
      </x-table>
    </x-dialog>
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      .row {
        padding: 1rem;
      }
      .row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ],
  providers: [UsersServiceTest]
})
class TestXTableAdaptionComponent {
  query: XQuery = {};
  index = 1;
  size = 1000;
  total = 0;
  data: User[] = [];
  columns: XTableColumn[] = [
    { id: 'index', label: '序号', width: 100, left: 0, type: 'index' },
    { id: 'name', label: '用户', width: 200, sort: true },
    { id: 'position', label: '职位', width: 300, sort: true },
    { id: 'email', label: '邮箱', width: 300 },
    { id: 'phone', label: '电话', width: 300 },
    { id: 'organization', label: '组织机构', flex: 1, sort: true }
  ];

  visible = false;

  constructor(private service: UsersServiceTest, private cdr: ChangeDetectorRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    interval(10).subscribe(() => this.cdr.detectChanges());
  }

  getData() {
    this.service.getList(this.index, this.size, this.query).subscribe((x) => {
      [this.data, this.total] = [x.list as User[], Number(x.total)];
      this.cdr.detectChanges();
    });
  }

  indexChange(index: number) {
    this.index = index;
    this.getData();
  }

  sortChange(sort: XSort[]) {
    this.query.sort = sort;
    this.getData();
  }

  dialog() {
    this.getData();
    this.visible = true;
    this.cdr.detectChanges();
  }

  close() {
    this.visible = false;
    this.cdr.detectChanges();
  }
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <div class="row">
      <x-table [columns]="columns" [data]="data"> </x-table>
    </div>
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      .row {
        padding: 1rem;
      }
      .row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ],
  providers: [UsersServiceTest]
})
class TestXTableFunctionComponent {
  // query: XQuery = {};
  // index = 1;
  // size = 10;
  // total = 0;
  data = (index: number, size: number, query: XQuery) =>
    this.service.getList(index, size, query).pipe(
      rxjsMap((x) => {
        console.log(x);
        return x;
      })
    );

  columns: XTableColumn[] = [
    { id: 'index', label: '序号', flex: 0.5, left: 0, type: 'index' },
    { id: 'name', label: '用户', flex: 1.5, sort: true },
    { id: 'position', label: '职位', flex: 0.5, sort: true },
    { id: 'email', label: '邮箱', flex: 1 },
    { id: 'phone', label: '电话', flex: 1 },
    { id: 'organization', label: '组织机构', flex: 1, sort: true }
  ];

  constructor(private service: UsersServiceTest, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // this.getData();
  }

  ngAfterViewInit() {
    interval(10).subscribe(() => this.cdr.detectChanges());
  }

  // getData() {
  //   this.service.getList(this.index, this.size, this.query).subscribe((x) => {
  //     [this.data, this.total] = [x.list as User[], Number(x.total)];
  //     this.cdr.detectChanges();
  //   });
  // }

  // indexChange(index: number) {
  //   this.index = index;
  //   this.getData();
  // }

  // sortChange(sort: XSort[]) {
  //   this.query.sort = sort;
  //   this.getData();
  // }
}
