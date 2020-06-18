import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XTableComponent } from './table.component';
import { Component, DebugElement, Injectable, ChangeDetectorRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XTableModule } from '@ng-nest/ui/table';
import { XTablePrefix, XTableColumn, XTableAction } from './table.property';
import {
  XId,
  XRepositoryService,
  XHttpService,
  XQuery,
  XResultList,
  XRepositoryAbstract,
  XFilter,
  XGroupItem,
  XSort
} from '@ng-nest/ui/core';
import { chunk, map, groupBy, orderBy } from 'lodash';
import { Observable, interval } from 'rxjs';
import { XIconModule } from '@ng-nest/ui/icon';
import { XAvatarModule } from '@ng-nest/ui/avatar';
import { XDialogModule } from '@ng-nest/ui/dialog';
import { XButtonModule } from '@ng-nest/ui/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe(XTablePrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, XTableModule, XIconModule, XAvatarModule, XDialogModule, XButtonModule],
      declarations: [TestXTableComponent, TestXTableScrollComponent, TestXTableAdaptionComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXTableComponent>;
    let testComponent: TestXTableComponent;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXTableComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XTableComponent));
      element = debugElement.nativeElement;
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`scroll`, () => {
    let fixture: ComponentFixture<TestXTableScrollComponent>;
    let testComponent: TestXTableScrollComponent;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXTableScrollComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XTableComponent));
      element = debugElement.nativeElement;
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`adaption`, () => {
    let fixture: ComponentFixture<TestXTableAdaptionComponent>;
    let testComponent: TestXTableAdaptionComponent;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXTableAdaptionComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
    });
    it('should create.', () => {
      expect(true).toBe(true);
    });
  });
});

@Injectable()
class UsersService extends XRepositoryService<User> {
  constructor(public http: XHttpService) {
    super(http, { controller: { name: 'http://localhost:3000/users' } });
  }
}

@Injectable()
class UsersServiceTest extends XRepositoryAbstract {
  organizations = ['制造中心', '研发中心', '财务中心', '营销中心', '行政中心'];
  positions = ['技术员', '销售', '经理', '总监', '生产员'];
  users: User[] = Array.from({ length: 123456 }).map((x, i) => {
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
  [prop: string]: any;
}

@Component({
  selector: 'test-x-table',
  template: `
    <div style="padding: 1rem;">
      <x-table
        [data]="data"
        [(index)]="index"
        [(size)]="size"
        (indexChange)="indexChange($event)"
        [columns]="columns"
        [headerColumnTpl]="{ name: nameHeaderTemp }"
        [bodyColumnTpl]="{ name: nameBodyTemp }"
        allowSelectRow
      ></x-table>
    </div>
    <ng-template #nameHeaderTemp let-column="$column">
      <div class="header-username">
        <x-icon type="fto-user"></x-icon>
        <span>{{ column.label }}</span>
      </div>
    </ng-template>
    <ng-template #nameBodyTemp let-column="$column" let-item="$item">
      <div class="body-username">
        <x-avatar size="mini" src="https://ngnest.com/assets/img/logo/logo-144x144.png"></x-avatar>
        <span>{{ item[column.id] }}</span>
      </div>
    </ng-template>
  `,
  styles: [
    `
      .header-username,
      .body-username {
        display: flex;
        align-items: center;
      }
      .header-username > span,
      .body-username > span {
        margin-left: 0.5rem;
      }
    `
  ],
  providers: [UsersServiceTest]
})
class TestXTableComponent {
  constructor(public usersServiceTest: UsersServiceTest, private cdr: ChangeDetectorRef) {}
  query = {};
  index = 1;
  size = 10;
  data: XResultList<User>;
  columns: XTableColumn[] = [
    { id: 'name', label: '用户', flex: 1.5, search: true, sort: true, action: true },
    { id: 'position', label: '职位', flex: 0.5, sort: true },
    { id: 'email', label: '邮箱', flex: 1 },
    { id: 'phone', label: '电话', flex: 1 },
    { id: 'organization', label: '组织机构', flex: 1, sort: true }
  ];

  ngOnInit() {
    this.getData();
  }

  ngAfterViewInit() {
    interval(10).subscribe(() => this.cdr.detectChanges());
  }

  getData() {
    this.usersServiceTest.getList(this.index, this.size, this.query).subscribe((x) => {
      this.data = x;
    });
  }

  indexChange(index: number) {
    this.getData();
  }
}

@Component({
  selector: 'test-x-table-scroll',
  template: `
    <div style="padding: 1rem 2rem;">
      <x-table
        [columns]="columns"
        [actions]="actions"
        [service]="usersServiceTest"
        [size]="10000"
        [itemSize]="50"
        [bodyHeight]="420"
        [headerColumnTpl]="{ name: nameHeaderTemp }"
        [bodyColumnTpl]="{ name: nameBodyTemp }"
        allowSelectRow
        searchShow
        virtualScroll
      ></x-table>
    </div>
    <ng-template #nameHeaderTemp let-column="$column">
      <div class="header-username">
        <x-icon type="fto-user"></x-icon>
        <span>{{ column.label }}</span>
      </div>
    </ng-template>
    <ng-template #nameBodyTemp let-column="$column" let-item="$item">
      <div class="body-username">
        <x-avatar size="mini" src="https://ngnest.com/assets/img/logo/logo-144x144.png"></x-avatar>
        <span>{{ item[column.id] }}</span>
      </div>
    </ng-template>
  `,
  styles: [
    `
      .header-username,
      .body-username {
        display: flex;
        align-items: center;
      }
      .header-username > span,
      .body-username > span {
        margin-left: 0.5rem;
      }
    `
  ],
  providers: [UsersServiceTest]
})
class TestXTableScrollComponent {
  constructor(public usersServiceTest: UsersServiceTest, private cdr: ChangeDetectorRef) {}
  columns: XTableColumn[] = [
    { id: 'index', label: '序号', width: 100, left: 0, type: 'index' },
    { id: 'name', label: '用户', width: 150, left: 100, search: true, sort: true, action: true },
    { id: 'position', label: '职位', width: 150, sort: true },
    { id: 'email', label: '邮箱', width: 300 },
    { id: 'phone', label: '电话', flex: 1 },
    { id: 'organization', label: '组织机构', width: 150, sort: true }
  ];
  actions: XTableAction[] = [
    { label: '新增', icon: 'fto-plus', type: 'primary' },
    { label: '导出', icon: 'fto-download' },
    { label: '批量操作', icon: 'fto-list' },
    {
      icon: 'fto-menu',
      title: '列表视图',
      activated: true,
      actionLayoutType: 'top-right-icon'
    },
    {
      icon: 'fto-disc',
      title: '组织视图',
      actionLayoutType: 'top-right-icon',
      group: 'organization'
    },
    {
      icon: 'fto-briefcase',
      title: '职位视图',
      actionLayoutType: 'top-right-icon',
      group: 'position'
    },
    {
      icon: 'fto-edit',
      title: '编辑',
      actionLayoutType: 'row-icon'
    },
    {
      icon: 'fto-trash-2',
      title: '删除',
      actionLayoutType: 'row-icon'
    }
  ];

  ngAfterViewInit() {
    interval(10).subscribe(() => this.cdr.detectChanges());
  }
}

@Component({
  selector: 'test-x-table-adaption',
  template: `
    <x-button (click)="dialog()">弹框表格自适应</x-button>
    <x-dialog
      title="弹框表格自适应(缩放浏览器窗口查看效果)"
      width="90%"
      height="90%"
      [(visible)]="visible"
      (close)="close()"
      (cancel)="close()"
      (confirm)="close()"
    >
      <x-table
        [columns]="columns"
        [actions]="actions"
        [service]="usersServiceTest"
        [size]="10000"
        [bodyHeight]="420"
        [headerColumnTpl]="{ name: nameHeaderTemp }"
        [bodyColumnTpl]="{ name: nameBodyTemp }"
        [adaptionHeight]="104"
        [docPercent]="0.9"
        searchShow
        allowSelectRow
        virtualScroll
      ></x-table>
    </x-dialog>
    <ng-template #nameHeaderTemp let-column="$column">
      <div class="header-username">
        <x-icon type="fto-user"></x-icon>
        <span>{{ column.label }}</span>
      </div>
    </ng-template>
    <ng-template #nameBodyTemp let-column="$column" let-item="$item">
      <div class="body-username">
        <x-avatar size="mini" src="https://ngnest.com/assets/img/logo/logo-144x144.png"></x-avatar>
        <span>{{ item[column.id] }}</span>
      </div>
    </ng-template>
  `,
  styles: [
    `
      .header-username,
      .body-username {
        display: flex;
        align-items: center;
      }
      .header-username > span,
      .body-username > span {
        margin-left: 0.5rem;
      }
    `
  ],
  providers: [UsersServiceTest]
})
class TestXTableAdaptionComponent {
  visible = false;
  constructor(public usersServiceTest: UsersServiceTest, private cdr: ChangeDetectorRef) {}
  columns: XTableColumn[] = [
    { id: 'index', label: '序号', width: 100, left: 0, type: 'index' },
    { id: 'name', label: '用户', width: 150, left: 100, search: true, sort: true, action: true },
    { id: 'position', label: '职位', width: 150, sort: true },
    { id: 'email', label: '邮箱', width: 300 },
    { id: 'phone', label: '电话', flex: 1 },
    { id: 'organization', label: '组织机构', width: 150, sort: true }
  ];
  actions: XTableAction[] = [
    { label: '新增', icon: 'fto-plus', type: 'primary' },
    { label: '导出', icon: 'fto-download' },
    { label: '批量操作', icon: 'fto-list' },
    {
      icon: 'fto-menu',
      title: '列表视图',
      activated: true,
      actionLayoutType: 'top-right-icon'
    },
    {
      icon: 'fto-disc',
      title: '组织视图',
      actionLayoutType: 'top-right-icon',
      group: 'organization'
    },
    {
      icon: 'fto-briefcase',
      title: '职位视图',
      actionLayoutType: 'top-right-icon',
      group: 'position'
    },
    {
      icon: 'fto-edit',
      title: '编辑',
      actionLayoutType: 'row-icon'
    },
    {
      icon: 'fto-trash-2',
      title: '删除',
      actionLayoutType: 'row-icon'
    }
  ];

  ngAfterViewInit() {
    interval(10).subscribe(() => this.cdr.detectChanges());
  }

  dialog() {
    this.visible = true;
    this.cdr.detectChanges();
  }

  close() {
    this.visible = false;
    this.cdr.detectChanges();
  }
}
