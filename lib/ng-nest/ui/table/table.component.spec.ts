import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { XTableComponent } from "./table.component";
import { Component, DebugElement, Injectable } from "@angular/core";
import { By } from "@angular/platform-browser";
import { XTableModule } from "./table.module";
import { TablePrefix, XTableColumn, XTableAction } from "./table.type";
import { XId, XRepositoryService, XHttpService, XQuery, XResultList } from "@ng-nest/ui/core";
import * as _ from "lodash";
import { Observable } from "rxjs";

describe(TablePrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XTableModule],
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
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
    it("should className.", () => {
      fixture.detectChanges();
      expect(element.classList).toContain(TablePrefix);
    });
  });
});

@Injectable()
class UsersService extends XRepositoryService<User> {
  constructor(public http: XHttpService) {
    super(http, { controller: { name: "http://localhost:3000/users" } });
  }
}

interface User extends XId {
  name: string;
  account: string;
  password: string;
  email: string;
  phone: string;
  organization: string;
}

@Component({
  selector: "test-x-table",
  template: `
    <div style="padding: 1rem 2rem; background: #fafafa;">
      <x-table
        [columns]="columns"
        [actions]="actions"
        [service]="usersService"
        [allowSelectRow]="true"
      ></x-table>
    </div>
  `,
  providers: [UsersService]
})
class TestXTableComponent {
  constructor(public usersService: UsersService) {}
  actions: XTableAction[] = [
    { label: "新增", icon: "fto-plus" },
    { label: "导出", icon: "fto-download" },
    { label: "批量操作", icon: "fto-list" },
    {
      icon: "fto-menu",
      title: "列表视图",
      activated: true,
      actionLayoutType: "top-right-icon"
    },
    {
      icon: "fto-disc",
      title: "组织视图",
      actionLayoutType: "top-right-icon",
      group: "organization"
    },
    {
      icon: "fto-user",
      title: "角色视图",
      actionLayoutType: "top-right-icon"
    },
    {
      icon: "fto-play",
      title: "播放",
      actionLayoutType: "row-icon"
    },
    {
      icon: "fto-plus-square",
      title: "添加到",
      actionLayoutType: "row-icon"
    },
    {
      icon: "fto-download",
      title: "下载",
      actionLayoutType: "row-icon"
    },
    {
      icon: "fto-more-vertical",
      title: "更多操作",
      actionLayoutType: "row-icon"
    }
  ];
  columns: XTableColumn[] = [
    { key: "name", label: "用户", flex: 1.5 },
    { key: "account", label: "账号", flex: 0.5 },
    { key: "email", label: "邮箱", flex: 1 },
    { key: "phone", label: "电话", flex: 1 },
    { key: "organization", label: "组织机构", flex: 1 }
  ];
}
