import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Component,
  DebugElement,
  Injectable,
  ChangeDetectorRef,
  provideExperimentalZonelessChangeDetection
} from '@angular/core';
import { By } from '@angular/platform-browser';
import { XTableComponent } from '@ng-nest/ui/table';
import { FormsModule } from '@angular/forms';
import { XTablePrefix, XTableColumn, XTableCellConfig } from './table.property';
import {
  XRepositoryAbstract,
  XQuery,
  XResultList,
  XGroupItem,
  XFilter,
  XChunk,
  XGroupBy,
  XSort,
  XId,
  XOrderBy
} from '@ng-nest/ui/core';
import { Observable, interval } from 'rxjs';
import { map as rxjsMap, delay } from 'rxjs/operators';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XAvatarComponent } from '@ng-nest/ui/avatar';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XInputComponent } from '@ng-nest/ui/input';
import { XSelectComponent } from '@ng-nest/ui/select';
import { XSwitchComponent } from '@ng-nest/ui/switch';
import { XLinkComponent } from '@ng-nest/ui/link';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XDescriptionModule } from '@ng-nest/ui/description';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { XDialogComponent } from '@ng-nest/ui/dialog';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe(XTablePrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestXTableComponent,
        TestXTableScrollComponent,
        TestXTableAdaptionComponent,
        TestXTableBorderedComponent,
        TestXTableFunctionComponent,
        TestXTableMergeColumnComponent,
        TestXTableWidthDragComponent,
        TestXTableCheckboxComponent,
        TestXTableRowSizeComponent,
        TestXTablePaginationComponent
      ],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        XDescriptionModule,
        XTableComponent,
        XIconComponent,
        XAvatarComponent,
        XButtonComponent,
        XLinkComponent,
        XInputComponent,
        XSelectComponent,
        XSwitchComponent,
        XDialogComponent
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
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
  describe(`bordered.`, () => {
    let fixture: ComponentFixture<TestXTableBorderedComponent>;
    let table: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXTableBorderedComponent);
      fixture.detectChanges();
      table = fixture.debugElement.query(By.directive(XTableComponent));
    });
    it('should create.', () => {
      expect(table).toBeDefined();
    });
  });
  describe(`column width drag.`, () => {
    let fixture: ComponentFixture<TestXTableWidthDragComponent>;
    let table: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXTableWidthDragComponent);
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
  describe(`merge column.`, () => {
    let fixture: ComponentFixture<TestXTableMergeColumnComponent>;
    let table: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXTableMergeColumnComponent);
      fixture.detectChanges();
      table = fixture.debugElement.query(By.directive(XTableComponent));
    });
    it('should create.', () => {
      expect(table).toBeDefined();
    });
  });
  describe(`checkbox.`, () => {
    let fixture: ComponentFixture<TestXTableCheckboxComponent>;
    let table: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXTableCheckboxComponent);
      fixture.detectChanges();
      table = fixture.debugElement.query(By.directive(XTableComponent));
    });
    it('should create.', () => {
      expect(table).toBeDefined();
    });
  });
  describe(`row size.`, () => {
    let fixture: ComponentFixture<TestXTableRowSizeComponent>;
    let table: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXTableRowSizeComponent);
      fixture.detectChanges();
      table = fixture.debugElement.query(By.directive(XTableComponent));
    });
    it('should create.', () => {
      expect(table).toBeDefined();
    });
  });
  describe(`pagination.`, () => {
    let fixture: ComponentFixture<TestXTablePaginationComponent>;
    let table: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXTablePaginationComponent);
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
  users: User[] = Array.from({ length: 10000 }).map((_x, i) => {
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
      let chunks = XChunk(data, size);
      if ((index as number) <= chunks.length) {
        x.next({ total: data.length, list: chunks[index - 1] });
      } else {
        x.next({ total: data.length, list: [] });
      }
      x.complete();
    });
  }
  get(_id: number | string): Observable<User> {
    return new Observable();
  }
  post(_entity: User): Observable<User> {
    return new Observable();
  }
  put(_entity: User): Observable<User> {
    return new Observable();
  }
  delete(_id: number | string): Observable<boolean> {
    return new Observable();
  }

  private setFilter(data: User[], filters: XFilter[]): User[] {
    let result = data;
    if (filters && filters.length > 0) {
      filters.forEach((x) => {
        result = result.filter((y) => y[x.field!].indexOf(x.value) >= 0);
      });
    }
    return result;
  }

  private setGroup(data: User[], group: string): XGroupItem[] {
    return XGroupBy(data, group).map((value, key) => {
      let groupItem: XGroupItem = { id: key, count: value.length };
      groupItem[group] = key;
      return groupItem;
    });
  }

  private setSort(data: User[] | XGroupItem[], sort: XSort[]): User[] | XGroupItem[] {
    return XOrderBy(
      data,
      sort.map((x) => x.field!),
      sort.map((x) => x.value) as ('desc' | 'asc')[]
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
class TestXTableComponent {
  data = (index: number, size: number, query: XQuery) => this.service.getList(index, size, query).pipe(delay(2000));
  columns: XTableColumn[] = [
    { id: 'index', label: '序号', type: 'index' },
    { id: 'name', label: '用户', sort: true },
    { id: 'position', label: '职位', sort: true },
    { id: 'email', label: '邮箱' },
    { id: 'phone', label: '电话' },
    { id: 'organization', label: '组织机构', sort: true }
  ];

  constructor(private service: UsersServiceTest) {}

  ngOnInit() {}
}

@Component({
  template: `
    <div class="row">
      <x-table
        [rowHeight]="50"
        [columns]="columns"
        [data]="data"
        [size]="1000"
        [scroll]="{ x: 1500, y: 600 }"
        virtualScroll
        loading
        rowSize="big"
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

  constructor(private service: UsersServiceTest) {}

  ngOnInit() {}
}

@Component({
  template: `
    <div class="row">
      <x-table
        [rowHeight]="0"
        [columns]="columns"
        [data]="data"
        [size]="1000"
        [scroll]="{ x: 1500, y: 600 }"
        virtualScroll
        loading
        bordered
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
class TestXTableBorderedComponent {
  data = (index: number, size: number, query: XQuery) => this.service.getList(index, size, query).pipe(delay(2000));
  columns: XTableColumn[] = [
    { id: 'index', label: '序号', width: 100, left: 0, type: 'index' },
    { id: 'name', label: '用户', width: 200, sort: true },
    { id: 'position', label: '职位', width: 300, sort: true },
    { id: 'email', label: '邮箱', width: 300 },
    { id: 'phone', label: '电话', width: 300 },
    { id: 'organization', label: '组织机构', flex: 1, sort: true }
  ];

  constructor(private service: UsersServiceTest) {}

  ngOnInit() {}
}

@Component({
  template: `
    <div class="row">
      <x-table
        [rowHeight]="0"
        [columns]="columns"
        [data]="data"
        [size]="1000"
        [scroll]="{ x: 1300, y: 600 }"
        virtualScroll
        loading
        bordered
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
class TestXTableWidthDragComponent {
  data = (index: number, size: number, query: XQuery) => this.service.getList(index, size, query).pipe(delay(2000));
  columns: XTableColumn[] = [
    { id: 'index', label: '序号', width: 100, left: 0, type: 'index' },
    { id: 'name', label: '用户', width: 150, sort: true, dragWidth: true },
    { id: 'position', label: '职位', width: 150, sort: true, dragWidth: true },
    { id: 'email', label: '邮箱', width: 200, dragWidth: true },
    { id: 'phone', label: '电话', width: 200, dragWidth: true },
    { id: 'organization', label: '组织机构', flex: 1, sort: true }
  ];

  constructor(
    private service: UsersServiceTest,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    interval(10).subscribe(() => this.cdr.detectChanges());
  }
}

@Component({
  template: `
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
        [adaptionHeight]="139"
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

  constructor(
    private service: UsersServiceTest,
    private cdr: ChangeDetectorRef
  ) {}

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

  constructor(
    private service: UsersServiceTest,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    interval(10).subscribe(() => this.cdr.detectChanges());
  }
}

@Component({
  template: `
    <div class="row">
      <x-table [columns]="columns" [data]="data" [cellConfig]="cellConfig"> </x-table>
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
class TestXTableMergeColumnComponent {
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
    { id: 'position', label: '职位', flex: 1, sort: true },
    { id: 'email', label: '邮箱', flex: 1 },
    { id: 'phone', label: '电话', flex: 1 },
    { id: 'organization', label: '组织机构', flex: 1, sort: true }
  ];

  cellConfig: XTableCellConfig = {
    thead: {
      cells: [
        { gridArea: '1 / 1 / 3 / 2', id: 'index' },
        { gridArea: '1 / 2 / 2 / 5', label: '详细信息' },
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

  constructor(
    private service: UsersServiceTest,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    interval(10).subscribe(() => this.cdr.detectChanges());
  }
}

@Component({
  template: `
    <div class="row">
      <x-table [columns]="columns" [data]="data" loading [allowSelectRow]="false"> </x-table>
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
class TestXTableCheckboxComponent {
  data = (index: number, size: number, query: XQuery) => this.service.getList(index, size, query).pipe(delay(1000));
  columns: XTableColumn[] = [
    { id: 'checked', label: '', rowChecked: true, headChecked: true, type: 'checkbox', width: 60 },
    { id: 'index', label: '序号', flex: 0.5, type: 'index' },
    { id: 'name', label: '用户', flex: 1.5, sort: true },
    { id: 'position', label: '职位', flex: 0.5, sort: true },
    { id: 'email', label: '邮箱', flex: 1 },
    { id: 'phone', label: '电话', flex: 1 },
    { id: 'organization', label: '组织机构', flex: 1, sort: true }
  ];

  constructor(private service: UsersServiceTest) {}

  ngOnInit() {}
}

@Component({
  template: `
    <div class="row">
      <x-table [columns]="columns" [data]="data" [size]="10" loading [rowHeight]="58" rowSize="big"> </x-table>
    </div>
    <div class="row">
      <x-table [columns]="columns" [data]="data" [size]="10" loading [rowHeight]="50" rowSize="large"> </x-table>
    </div>
    <div class="row">
      <x-table [columns]="columns" [data]="data" [size]="10" loading> </x-table>
    </div>
    <div class="row">
      <x-table [columns]="columns" [data]="data" [size]="10" loading [rowHeight]="32" rowSize="small"> </x-table>
    </div>
    <div class="row">
      <x-table [columns]="columns" [data]="data" [size]="10" loading [rowHeight]="24" rowSize="mini"> </x-table>
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
class TestXTableRowSizeComponent {
  data = (index: number, size: number, query: XQuery) => this.service.getList(index, size, query).pipe(delay(2000));
  columns: XTableColumn[] = [
    { id: 'index', label: '序号', flex: 0.5, left: 0, type: 'index' },
    { id: 'name', label: '用户', flex: 1.5, sort: true },
    { id: 'position', label: '职位', flex: 0.5, sort: true },
    { id: 'email', label: '邮箱', flex: 1 },
    { id: 'phone', label: '电话', flex: 1 },
    { id: 'organization', label: '组织机构', flex: 1, sort: true }
  ];

  constructor(private service: UsersServiceTest) {}

  ngOnInit() {}
}

@Component({
  template: `
    <div class="row">
      <x-table
        [(size)]="size"
        [columns]="columns"
        [data]="data"
        [rowHeight]="0"
        [scroll]="{ y: 400, x: 450 }"
        [bodyColumnTpl]="{ name: nameTpl }"
        virtualScroll
        loading
        hiddenBorder
        showEllipsis="false"
        showTotal="false"
        showHeader="false"
      >
      </x-table>
      <ng-template #nameTpl let-column="$column" let-row="$row" let-index="$index">
        <div class="custom-td">
          <x-avatar icon="fto-user"></x-avatar>
          <div class="custom-td-inner">
            <span class="custom-td-name">{{ row.name }}</span>
            <span class="custom-td-organization">{{ row.organization }}</span>
          </div>
        </div>
      </ng-template>
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
        width: 30rem;
      }
      .row:not(:first-child) {
        margin-top: 1rem;
      }
      .custom-td {
        display: flex;
        align-items: center;
        color: var(--x-text);
      }
      .custom-td x-icon {
        font-size: 4rem;
        padding: 1rem;
      }
      .custom-td-inner {
        margin-left: $--x-font-size;
        display: flex;
        flex-direction: column;
      }
      .custom-td-name {
        font-weight: 600;
      }
      .custom-td-organization {
      }
    `
  ],
  providers: [UsersServiceTest]
})
class TestXTablePaginationComponent {
  size = 100;
  data = (index: number, size: number, query: XQuery) => this.service.getList(index, size, query).pipe(delay(2000));
  columns: XTableColumn[] = [{ id: 'name', label: '用户', flex: 1.5, sort: true }];

  constructor(private service: UsersServiceTest) {}

  ngOnInit() {}
}
