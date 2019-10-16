import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NmTableComponent } from "./nm-table.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NmTableModule } from "./nm-table.module";
import { TablePrefix, NmTableColumn, NmTableAction } from "./nm-table.type";

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

@Component({
  selector: "test-nm-table",
  template: `
    <div style="padding: 1rem 2rem; background: #fafafa;">
      <nm-table
        [nmData]="data"
        [nmColumns]="columns"
        [nmActions]="actions"
      ></nm-table>
    </div>
  `
})
class TestNmTableComponent {
  actions: NmTableAction[] = [
    { nmLabel: "播放全部", nmIcon: "ado-caret-right" },
    { nmLabel: "下载", nmIcon: "ado-download" },
    { nmLabel: "批量操作", nmIcon: "ado-bars" },
    {
      nmIcon: "ado-menu",
      nmTitle: "列表视图",
      nmActionLayoutType: "top-right-icon"
    },
    {
      nmIcon: "ado-team",
      nmTitle: "歌手视图",
      nmActionLayoutType: "top-right-icon"
    },
    {
      nmIcon: "ado-inbox",
      nmTitle: "专辑视图",
      nmActionLayoutType: "top-right-icon"
    },
    {
      nmIcon: "ado-caret-right",
      nmTitle: "播放",
      nmActionLayoutType: "row-icon"
    },
    {
      nmIcon: "ado-plus-square",
      nmTitle: "添加到",
      nmActionLayoutType: "row-icon"
    },
    {
      nmIcon: "ado-download",
      nmTitle: "下载",
      nmActionLayoutType: "row-icon"
    },
    {
      nmIcon: "ado-download",
      nmTitle: "更多操作",
      nmActionLayoutType: "row-icon"
    }
  ];
  columns: NmTableColumn[] = [
    { nmKey: "song", nmLabel: "歌曲", nmFlex: 2 },
    { nmKey: "auth", nmLabel: "作者", nmFlex: 1 },
    { nmKey: "album", nmLabel: "专辑", nmFlex: 1 }
  ];
  data = [
    {
      song: "Free Loop 福特轿车广告曲",
      auth: "Daniel Powter",
      album: "Daniel Powter"
    },
    {
      song: "Be What You Wanna Be",
      auth: "Darin",
      album: "Darin"
    },
    {
      song: "The Show",
      auth: "Lenka",
      album: "The Show"
    },
    {
      song: "Intro 《魔兽之亡灵曲》游戏插曲",
      auth: "Dreamtale",
      album: "Beyond Reality"
    }
  ];
}
