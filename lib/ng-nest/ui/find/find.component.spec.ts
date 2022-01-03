import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XFindComponent } from './find.component';
import { Component, DebugElement, ChangeDetectorRef, Injectable } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XFindModule } from '@ng-nest/ui/find';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XFindPrefix, XFindSearchOption } from './find.property';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XDialogOption } from '@ng-nest/ui/dialog';
import { XRepositoryAbstract, XQuery, XResultList, XGroupItem, XFilter, chunk, XSort, XId, XOrderBy, XCloneDeep } from '@ng-nest/ui/core';
import { Observable } from 'rxjs';
import { XTreeNode } from '@ng-nest/ui/tree';
import { XThemeModule } from '@ng-nest/ui/theme';
import { XRadioModule } from '@ng-nest/ui/radio';

describe(XFindPrefix, () => {
  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, XThemeModule, XFindModule, FormsModule, ReactiveFormsModule, XLayoutModule, XRadioModule],
      declarations: [
        TestXFindComponent,
        TestXFindLabelComponent,
        TestXFindDisabledComponent,
        TestXFindFunctionComponent,
        TestXFindSizeComponent,
        TestXFindBorderedComponent
      ]
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
  describe(`function.`, () => {
    let fixture: ComponentFixture<TestXFindFunctionComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXFindFunctionComponent);
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
  describe(`size.`, () => {
    let fixture: ComponentFixture<TestXFindSizeComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXFindSizeComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXFindComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`bordered.`, () => {
    let fixture: ComponentFixture<TestXFindBorderedComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXFindBorderedComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXFindComponent));
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
  users: User[] = Array.from({ length: 123456 }).map((_x, i) => {
    i++;
    let positionId = Math.floor(Math.random() * 5 + 1);
    let organizationId = Math.floor(Math.random() * 9 + 1);
    return {
      id: i,
      label: '姓名' + i,
      positionId: positionId,
      position: this.positions[positionId - 1],
      email: '邮箱' + i,
      phone: '手机' + i,
      organizationId: organizationId,
      organization: this.organizations[organizationId - 1]
    };
  });

  getList(index: number, size: number, query?: XQuery): Observable<XResultList<User | XGroupItem>> {
    return new Observable((x) => {
      let data: User[] | XGroupItem[] = [];
      data = this.setFilter(this.users, query?.filter as XFilter[]);
      if (query?.group) {
        console.log(data, index, size, query);
      }
      if (query?.sort) {
        data = this.setSort(data, query.sort);
      }
      let chunks = chunk(data, size);
      let result = { total: 0, list: [] };
      if ((index as number) <= chunks.length) {
        result.total = data.length;
        result.list = chunks[index - 1] as [];
      } else {
        result.total = data.length;
      }
      setTimeout(() => {
        x.next(result);
        x.complete();
      }, 10);
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
        switch (x.operation) {
          case '=':
            result = result.filter((y) => y[x.field] === x.value);
            break;
          case '>':
            result = result.filter((y) => y[x.field] > x.value);
            break;
          case '>=':
            result = result.filter((y) => y[x.field] >= x.value);
            break;
          case '<':
            result = result.filter((y) => y[x.field] < x.value);
            break;
          case '<=':
            result = result.filter((y) => y[x.field] <= x.value);
            break;
          default:
            // '%'
            result = result.filter((y) => y[x.field].indexOf(x.value) >= 0);
            break;
        }
      });
    }
    return result;
  }

  private setSort(data: User[] | XGroupItem[], sort: XSort[]): User[] | XGroupItem[] {
    return XOrderBy(
      data,
      sort.map((x) => x.field),
      sort.map((x) => x.value) as ('desc' | 'asc')[]
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
    { id: 9, label: '财务部', pid: 4 },
    { id: 10, label: '人事部', pid: 4 },
    { id: 11, label: '行政部', pid: 4 },
    { id: 12, label: '财务部', pid: 4 },
    { id: 13, label: '人事部', pid: 4 },
    { id: 14, label: '行政部', pid: 4 },
    { id: 15, label: '财务部', pid: 4 },
    { id: 16, label: '人事部', pid: 4 },
    { id: 17, label: '行政部', pid: 4 },
    { id: 18, label: '财务部', pid: 4 }
  ];

  getTreeList = (_pid = undefined): Observable<XTreeNode[]> => {
    return new Observable((x) => {
      setTimeout(() => {
        x.next(XCloneDeep(this.data));
        x.complete();
      }, 10);
    });
  };
}

interface User extends XId {
  name?: string;
  account?: string;
  password?: string;
  email?: string;
  phone?: string;
  position?: string;
  positionId?: number;
  organization?: string;
  organizationId?: number;
  [property: string]: any;
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <!-- <x-row>
      <x-find
        label="表格单选"
        [(ngModel)]="model1"
        [tableColumns]="table.columns"
        [tableData]="table.data"
        [(tableIndex)]="table.index"
        [(tableSize)]="table.size"
        [tableTotal]="table.total"
        (dialogVisibleChange)="table.getData($event)"
        (tableIndexChange)="table.indexChange($event)"
        (tableSortChange)="table.sortChange($event)"
        required
      ></x-find>
    </x-row> -->
    <x-row>
      <x-find
        label="表格多选"
        (dialogVisibleChange)="table.getData($event)"
        [(ngModel)]="model2"
        [tableColumns]="table.columns"
        [tableData]="table.data"
        [(tableIndex)]="table.index"
        [(tableSize)]="table.size"
        [tableTotal]="table.total"
        [tableQuery]="table.query"
        (tableIndexChange)="table.indexChange($event)"
        (tableSortChange)="table.sortChange($event)"
        [tableVirtualScroll]="true"
        [tableBodyHeight]="420"
        [search]="searchOption"
        multiple
      ></x-find>
    </x-row>
    <!-- <x-row>
      <x-find label="树单选" [(ngModel)]="model3" (ngModelChange)="change($event)" [treeData]="treeService.data"></x-find>
    </x-row> -->
    <!-- <x-row>
      <x-find
        label="树加表格多选"
        [dialogWidth]="dialog.width"
        (dialogVisibleChange)="table.getData($event)"
        [(ngModel)]="model4"
        [tableColumns]="table.columns"
        [tableData]="table.data"
        [(tableIndex)]="table.index"
        [(tableSize)]="table.size"
        [tableTotal]="table.total"
        (tableIndexChange)="table.indexChange($event)"
        (tableSortChange)="table.sortChange($event)"
        [tableVirtualScroll]="table.virtualScroll"
        [tableBodyHeight]="table.bodyHeight"
        [treeData]="tree.data"
        (treeActivatedChange)="tree.activatedChange($event)"
      ></x-find>
    </x-row> -->
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      x-row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ],
  providers: [UsersServiceTest, TreeServiceTest]
})
class TestXFindComponent {
  dialog: XDialogOption = {
    width: '65rem'
  };
  searchOption: XFindSearchOption = {
    label: '用户',
    button: '搜索',
    field: 'label',
    value: ''
  };
  tree = {
    data: this.treeService.data,
    activatedChange: (node: any) => {
      this.table.query.filter = [{ field: 'organizationId', value: node.id, operation: '=' }];
      this.table.getData();
    }
  };
  table: {
    query: XQuery;
    index: number;
    size: number;
    total: number;
    data: [];
    getData: (visible?: boolean) => void;
    [property: string]: any;
  } = {
    index: 1,
    size: 1000,
    total: 0,
    data: [],
    query: { sort: [], filter: [] },
    columns: [
      { id: 'index', label: '序号', type: 'index', width: 80 },
      { id: 'label', label: '用户', flex: 1, sort: true },
      { id: 'position', label: '职位', flex: 1, sort: true },
      { id: 'organization', label: '组织机构', flex: 1, sort: true }
    ],
    indexChange: (index: number) => {
      this.table.index = index;
      this.table.getData();
    },
    sortChange: (sort: XSort[]) => {
      this.table.query.sort = sort as [];
      this.table.getData();
    },
    getData: (visible: boolean = true) => {
      if (visible) console.log(this.table.query);
      this.tableService.getList(this.table.index, this.table.size, this.table.query).subscribe((x) => {
        [this.table.data, this.table.total] = [x.list as [], Number(x.total)];
        this.cdr.detectChanges();
      });
    }
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
    <x-theme showDark></x-theme>
    <!-- <x-row>
      <x-find label="表格单选" [(ngModel)]="model1" [tableColumns]="table.columns" [tableData]="table.data"></x-find>
    </x-row> -->
    <!-- <x-row>
      <x-find
        label="表格多选"
        [(ngModel)]="model2"
        [tableColumns]="table.columns"
        [tableData]="table.data"
        multiple
      ></x-find>
    </x-row> -->
    <!-- <x-row>
      <x-find label="树单选" [(ngModel)]="model3" (ngModelChange)="change($event)" [treeData]="treeService.getTreeList"></x-find>
    </x-row> -->
    <!-- <x-row>
      <x-find label="树多选" [(ngModel)]="model3" (ngModelChange)="change($event)" [treeData]="treeService.getTreeList" multiple></x-find>
    </x-row> -->
    <!-- <x-row>
      <x-find
        label="树加表格多选"
        dialogWidth="65rem"
        [(ngModel)]="model2"
        [tableColumns]="table.columns"
        [tableData]="table.data"
        [tableSize]="1000"
        [tableVirtualScroll]="true"
        [tableBodyHeight]="420"
        [treeData]="treeService.getTreeList"
        treeTableConnect="organizationId"
        multiple
      ></x-find>
    </x-row> -->
    <x-row>
      <x-find
        label="树加表格单选选"
        [(ngModel)]="model4"
        [tableColumns]="table.columns"
        [tableData]="table.data"
        [tableSize]="1000"
        [tableVirtualScroll]="true"
        [tableBodyHeight]="420"
        [treeData]="treeService.getTreeList"
        treeTableConnect="organizationId"
      ></x-find>
    </x-row>
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      x-row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ],
  providers: [UsersServiceTest, TreeServiceTest]
})
class TestXFindFunctionComponent {
  table: { [property: string]: any } = {
    columns: [
      { id: 'index', label: '序号', type: 'index', width: 80 },
      { id: 'label', label: '用户', flex: 1, sort: true },
      { id: 'position', label: '职位', flex: 1, sort: true },
      { id: 'organization', label: '组织机构', flex: 1, sort: true }
    ],
    data: (index: number, size: number, query: XQuery) => this.tableService.getList(index, size, query)
  };

  model1 = { id: 1, label: '姓名1' };
  model2 = [
    { id: 1, label: '姓名1' },
    { id: 2, label: '姓名2' }
  ];

  model3 = [
    { id: 3, label: '姓名1' },
    { id: 4, label: '姓名2' }
  ];
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
    <x-theme showDark></x-theme>
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
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
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
    <x-theme showDark></x-theme>
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
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      x-row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXFindDisabledComponent {
  model = { id: 10, label: '姓名1' };
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-radio [data]="radioData" [(ngModel)]="size" (ngModelChange)="change($event)"></x-radio>
    <x-row>
      <x-col span="24">
        <x-find [size]="size"></x-find>
      </x-col>
      <x-col span="24">
        <x-find [size]="size" label="用户名" direction="row"></x-find>
      </x-col>
      <x-col span="24">
        <x-find [size]="size" label="用户名"></x-find>
      </x-col>
      <x-col span="24">
        <x-find [size]="size" [(ngModel)]="model" multiple></x-find>
      </x-col>
      <x-col span="24">
        <x-find disabled [size]="size"></x-find>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      x-row > x-col > x-find {
        width: 15rem;
        display: block;
      }
      x-row > x-col:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXFindSizeComponent {
  radioData = ['big', 'large', 'medium', 'small', 'mini'];
  size = 'medium';
  model = [
    { id: 1, label: '姓名1' },
    { id: 2, label: '姓名2' }
  ];
  constructor(private cdr: ChangeDetectorRef) {}
  change($event: string) {
    console.log($event);
    this.cdr.detectChanges();
  }
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row>
      <x-col span="24">
        <x-find bordered="false"></x-find>
      </x-col>
      <x-col span="24">
        <x-find bordered="false" label="用户名" direction="row"></x-find>
      </x-col>
      <x-col span="24">
        <x-find bordered="false" label="用户名"></x-find>
      </x-col>
      <x-col span="24">
        <x-find bordered="false" [(ngModel)]="model" multiple></x-find>
      </x-col>
      <x-col span="24">
        <x-find bordered="false" disabled></x-find>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      x-row > x-col > x-input {
        width: 15rem;
        display: block;
      }
      x-row > x-col:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXFindBorderedComponent {
  constructor() {}
  model = [
    { id: 1, label: '姓名1' },
    { id: 2, label: '姓名2' }
  ];
}
