import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XTableComponent } from './table.component';
import { Component, DebugElement, Injectable } from '@angular/core';
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
  XSort,
  XIsEmpty
} from '@ng-nest/ui/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { XIconModule } from '@ng-nest/ui/icon';
import { XAvatarModule } from '@ng-nest/ui/avatar';

describe(XTablePrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XTableModule, XIconModule, XAvatarModule],
      declarations: [TestXTableComponent]
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
  users: User[] = Array.from({ length: 1234 }).map((x, i) => {
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
      let chunks = _.chunk(data, size);
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
    return _.map(_.groupBy(data, group), (value, key) => {
      let groupItem: XGroupItem = { id: key, count: value.length };
      groupItem[group] = key;
      return groupItem;
    });
  }

  private setSort(data: User[] | XGroupItem[], sort: XSort[]): User[] | XGroupItem[] {
    return _.orderBy(
      data,
      _.map(sort, (x) => x.field),
      _.map(sort, (x) => x.value) as ('desc' | 'asc')[]
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
    <div style="padding: 1rem 2rem; background: #fafafa;">
      <x-table
        [columns]="columns"
        [actions]="actions"
        [service]="usersServiceTest"
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
        <x-avatar size="mini" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></x-avatar>
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
        margin-left: 0.25rem;
      }
    `
  ],
  providers: [UsersServiceTest]
})
class TestXTableComponent {
  constructor(public usersServiceTest: UsersServiceTest) {}
  columns: XTableColumn[] = [
    { id: 'name', label: '用户', flex: 1.5, search: true, sort: true },
    { id: 'position', label: '职位', flex: 0.5, sort: true },
    { id: 'email', label: '邮箱', flex: 1 },
    { id: 'phone', label: '电话', flex: 1 },
    { id: 'organization', label: '组织机构', flex: 1, sort: true }
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
}
