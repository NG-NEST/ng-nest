import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NuTableComponent } from "./nu-table.component";
import { Component, DebugElement, Injectable } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NuTableModule } from "./nu-table.module";
import { TablePrefix, NuTableColumn, NuTableAction } from "./nu-table.type";
import { NuId, NuRepositoryService, NuHttpService, NuQuery, NuResultList } from "@ng-nest/ui/core";
import * as _ from "lodash";
import { Observable } from "rxjs";

describe(TablePrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NuTableModule],
      declarations: [TestNuTableComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestNuTableComponent>;
    let testComponent: TestNuTableComponent;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNuTableComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(NuTableComponent));
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
class UsersService extends NuRepositoryService<User> {
  constructor(public http: NuHttpService) {
    super(http, { controller: { name: "http://localhost:3000/users" } });
  }
}

interface User extends NuId {
  name: string;
  account: string;
  password: string;
  email: string;
  phone: string;
  organization: string;
}

@Component({
  selector: "test-nu-table",
  template: `
    <div style="padding: 1rem 2rem; background: #fafafa;">
      <nu-table
        [nuColumns]="columns"
        [nuActions]="actions"
        [nuService]="usersService"
        [nuAllowSelectRow]="true"
      ></nu-table>
    </div>
  `,
  providers: [UsersService]
})
class TestNuTableComponent {
  constructor(public usersService: UsersService) {}
  actions: NuTableAction[] = [
    { nuLabel: "新增", nuIcon: "fto-plus" },
    { nuLabel: "导出", nuIcon: "fto-download" },
    { nuLabel: "批量操作", nuIcon: "fto-list" },
    {
      nuIcon: "fto-menu",
      nuTitle: "列表视图",
      nuActivated: true,
      nuActionLayoutType: "top-right-icon"
    },
    {
      nuIcon: "fto-disc",
      nuTitle: "组织视图",
      nuActionLayoutType: "top-right-icon",
      nuGroup: "organization"
    },
    {
      nuIcon: "fto-user",
      nuTitle: "角色视图",
      nuActionLayoutType: "top-right-icon"
    },
    {
      nuIcon: "fto-play",
      nuTitle: "播放",
      nuActionLayoutType: "row-icon"
    },
    {
      nuIcon: "fto-plus-square",
      nuTitle: "添加到",
      nuActionLayoutType: "row-icon"
    },
    {
      nuIcon: "fto-download",
      nuTitle: "下载",
      nuActionLayoutType: "row-icon"
    },
    {
      nuIcon: "fto-more-vertical",
      nuTitle: "更多操作",
      nuActionLayoutType: "row-icon"
    }
  ];
  columns: NuTableColumn[] = [
    { nuKey: "name", nuLabel: "用户", nuFlex: 1.5 },
    { nuKey: "account", nuLabel: "账号", nuFlex: 0.5 },
    { nuKey: "email", nuLabel: "邮箱", nuFlex: 1 },
    { nuKey: "phone", nuLabel: "电话", nuFlex: 1 },
    { nuKey: "organization", nuLabel: "组织机构", nuFlex: 1 }
  ];
}
