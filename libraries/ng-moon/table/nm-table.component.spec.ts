import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NmTableComponent } from "./nm-table.component";
import { Component, DebugElement, Injectable } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NmTableModule } from "./nm-table.module";
import { TablePrefix, NmTableColumn, NmTableAction } from "./nm-table.type";
import { NmId, NmRepositoryService, NmHttpService } from "ng-moon/core";
import * as _ from "lodash";

describe(TablePrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NmTableModule],
      declarations: [TestNmTableComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestNmTableComponent>;
    let testComponent: TestNmTableComponent;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNmTableComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(NmTableComponent));
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
class UsersService extends NmRepositoryService<User> {
  constructor(public http: NmHttpService) {
    super(http, { controller: { name: "http://localhost:3000/users" } });
  }
}

interface User extends NmId {
  name: string;
  account: string;
  password: string;
  email: string;
  phone: string;
  organization: string;
}

@Component({
  selector: "test-nm-table",
  template: `
    <div style="padding: 1rem 2rem; background: #fafafa;">
      <nm-table
        [nmColumns]="columns"
        [nmActions]="actions"
        [nmService]="usersService"
        [nmAllowSelectRow]="true"
      ></nm-table>
    </div>
  `,
  providers: [UsersService]
})
class TestNmTableComponent {
  constructor(public usersService: UsersService) {}
  actions: NmTableAction[] = [
    { nmLabel: "新增", nmIcon: "fto-plus" },
    { nmLabel: "导出", nmIcon: "fto-download" },
    { nmLabel: "批量操作", nmIcon: "fto-list" },
    {
      nmIcon: "fto-menu",
      nmTitle: "列表视图",
      nmActivated: true,
      nmActionLayoutType: "top-right-icon"
    },
    {
      nmIcon: "fto-disc",
      nmTitle: "组织视图",
      nmActionLayoutType: "top-right-icon",
      nmGroup: "organization"
    },
    {
      nmIcon: "fto-user",
      nmTitle: "角色视图",
      nmActionLayoutType: "top-right-icon"
    },
    {
      nmIcon: "fto-play",
      nmTitle: "播放",
      nmActionLayoutType: "row-icon"
    },
    {
      nmIcon: "fto-plus-square",
      nmTitle: "添加到",
      nmActionLayoutType: "row-icon"
    },
    {
      nmIcon: "fto-download",
      nmTitle: "下载",
      nmActionLayoutType: "row-icon"
    },
    {
      nmIcon: "fto-more-vertical",
      nmTitle: "更多操作",
      nmActionLayoutType: "row-icon"
    }
  ];
  columns: NmTableColumn[] = [
    { nmKey: "name", nmLabel: "用户", nmFlex: 1.5 },
    { nmKey: "account", nmLabel: "账号", nmFlex: 0.5 },
    { nmKey: "email", nmLabel: "邮箱", nmFlex: 1 },
    { nmKey: "phone", nmLabel: "电话", nmFlex: 1 },
    { nmKey: "organization", nmLabel: "组织机构", nmFlex: 1 }
  ];
}
