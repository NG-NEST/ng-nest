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
import { Observable, interval } from 'rxjs';
import { orderBy, map } from 'lodash';

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
  organizations = ['制造中心', '研发中心', '财务中心', '营销中心', '行政中心'];
  positions = ['技术员', '销售', '经理', '总监', '生产员'];
  users: User[] = Array.from({ length: 123456 }).map((x, i) => {
    i++;
    return {
      id: i,
      label: '姓名' + i,
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
  template: `
    <x-row>
      <x-col span="12">
        <x-find [(ngModel)]="model1" (ngModelChange)="change($event)" [tableColumn]="table.columns" [tableService]="table.service"></x-find>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-find [(ngModel)]="model2" (ngModelChange)="change($event)" [tableColumn]="table.columns" [tableService]="table.service"></x-find>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      :host {
        height: 900px;
      }
      x-row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ],
  providers: [UsersServiceTest]
})
class TestXFindComponent {
  dialog: XDialogOption = {};
  table: XTableOption = {
    service: this.service,
    columns: [
      { id: 'index', label: '序号', type: 'index', width: 100 },
      { id: 'label', label: '用户', flex: 1, search: true, sort: true },
      { id: 'position', label: '职位', flex: 1, sort: true },
      { id: 'organization', label: '组织机构', flex: 1, sort: true }
    ]
  };
  model1: boolean;
  model2 = { id: 1, label: '姓名1' };
  constructor(private service: UsersServiceTest, private cdr: ChangeDetectorRef) {
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
