import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XFindComponent } from './find.component';
import { Component, DebugElement, ChangeDetectorRef, Injectable } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XFindModule } from '@ng-nest/ui/find';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XFindPrefix } from './find.property';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XTableOption } from '@ng-nest/ui/table';
import { XDialogOption } from '@ng-nest/ui/dialog';
import { XRepositoryAbstract, XQuery, XResultList, XGroupItem, XFilter, chunk, groupBy, XSort, XId } from '@ng-nest/ui/core';
import { Observable } from 'rxjs';
import { orderBy, map } from 'lodash';
import { XTreeNode } from '@ng-nest/ui/tree';

describe(XFindPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, XFindModule, FormsModule, ReactiveFormsModule, XLayoutModule],
      declarations: [TestXFindComponent, TestXFindLabelComponent, TestXFindDisabledComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXFindComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXFindComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XFindComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`label.`, () => {
    let fixture: ComponentFixture<TestXFindLabelComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXFindLabelComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXFindLabelComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`disabled.`, () => {
    let fixture: ComponentFixture<TestXFindDisabledComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXFindDisabledComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXFindDisabledComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Injectable()
class UsersServiceTest extends XRepositoryAbstract {
  organizations = [
    '雷浩集团',
    '企业发展事业群',
    '社交网络事业群',
    '互动娱乐事业群',
    '移动互联网事业群',
    '网络媒体事业群',
    '人事部',
    '行政部',
    '财务部'
  ];
  positions = ['技术员', '销售', '经理', '总监', '生产员'];
  users: User[] = Array.from({ length: 123456 }).map((x, i) => {
    i++;
    return {
      id: i,
      label: '姓名' + i,
      position: this.positions[Math.floor(Math.random() * 10 + 1) % 5],
      email: '邮箱' + i,
      phone: '手机' + i,
      organization: this.organizations[Math.floor(Math.random() * 10 + 1) % 9]
    };
  });

  getList(index: number, size: number, query?: XQuery): Observable<XResultList<User | XGroupItem>> {
    return new Observable((x) => {
      console.log('query', query);
      let data: User[] | XGroupItem[] = [];
      data = this.setFilter(this.users, query?.filter as XFilter[]);
      if (query?.group) {
        console.log(data, index, size, query);
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

@Injectable()
class TreeServiceTest {
  data: XTreeNode[] = [
    { id: 1, label: '雷浩集团' },
    { id: 2, label: '企业发展事业群', pid: 1 },
    { id: 3, label: '社交网络事业群', pid: 1 },
    { id: 4, label: '互动娱乐事业群', pid: 1 },
    { id: 5, label: '移动互联网事业群', pid: 1 },
    { id: 6, label: '网络媒体事业群', pid: 1 },
    { id: 7, label: '人事部', pid: 4 },
    { id: 8, label: '行政部', pid: 4 },
    { id: 9, label: '财务部', pid: 4 }
  ];

  getTreeList = (pid = undefined): Observable<XTreeNode[]> => {
    return new Observable((x) => {
      let result = this.data
        .filter((y) => y.pid === pid)
        .map((x) => {
          x.leaf = this.data.find((y) => y.pid === x.id) ? true : false;
          return x;
        });
      setTimeout(() => {
        x.next(result);
        x.complete();
      }, 500);
    });
  };
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
  template: `
    <x-row>
      <x-find
        label="表格单选"
        [(ngModel)]="model1"
        (ngModelChange)="change($event)"
        [tableColumns]="table.columns"
        [tableService]="table.service"
      ></x-find>
    </x-row>
    <x-row>
      <x-find
        label="表格多选"
        [(ngModel)]="model2"
        (ngModelChange)="change($event)"
        [tableColumns]="table.columns"
        [tableService]="table.service"
        multiple
      ></x-find>
    </x-row>
    <x-row>
      <x-find label="树单选" [(ngModel)]="model3" (ngModelChange)="change($event)" [treeData]="treeService.data"></x-find>
    </x-row>
    <!-- <x-row>
      <x-find
        label="树加表格单选"
        [(ngModel)]="model4"
        [treeData]="treeData4"
        [tableColumns]="table.columns"
        [tableService]="table.service"
      ></x-find>
    </x-row> -->
  `,
  styles: [
    `
      x-row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ],
  providers: [UsersServiceTest, TreeServiceTest]
})
class TestXFindComponent {
  dialog: XDialogOption = {};
  table: XTableOption = {
    service: this.tableService,
    columns: [
      { id: 'index', label: '序号', type: 'index', width: 80 },
      { id: 'label', label: '用户', flex: 1, search: true, sort: true },
      { id: 'position', label: '职位', flex: 1, sort: true },
      { id: 'organization', label: '组织机构', flex: 1, sort: true }
    ]
  };

  model1 = { id: 1, label: '姓名1' };
  model2 = [
    { id: 1, label: '姓名1' },
    { id: 2, label: '姓名2' }
  ];

  model3 = { id: 7, label: '人事部' };
  model4 = { id: 1, label: '姓名1' };

  treeData4 = JSON.parse(JSON.stringify(this.treeService.data));
  constructor(public tableService: UsersServiceTest, public treeService: TreeServiceTest, public cdr: ChangeDetectorRef) {
    // interval(100).subscribe((x) => this.cdr.detectChanges());
  }
  change() {
    this.cdr.detectChanges();
  }
}

@Component({
  template: `
    <x-row>
      <x-col span="12">
        <x-find label="方式"></x-find>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-find label="方式" direction="column-reverse"></x-find>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-find label="方式" direction="row"></x-find>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-find label="方式" direction="row-reverse"></x-find>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      x-row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXFindLabelComponent {
  constructor() {}
}

@Component({
  template: `
    <x-row>
      <x-col span="12">
        <x-find disabled></x-find>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-find [(ngModel)]="model" disabled></x-find>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      x-row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXFindDisabledComponent {
  model = true;
}
