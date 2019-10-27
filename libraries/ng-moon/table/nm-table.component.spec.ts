import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NmTableComponent } from "./nm-table.component";
import { Component, DebugElement, ChangeDetectorRef } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NmTableModule } from "./nm-table.module";
import { TablePrefix, NmTableColumn, NmTableAction } from "./nm-table.type";
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

@Component({
  selector: "test-nm-table",
  template: `
    <div style="padding: 1rem 2rem; background: #fafafa;">
      <nm-table
        [nmColumns]="columns"
        [nmActions]="actions"
        [nmData]="data"
        [nmIndex]="index"
        [nmSize]="size"
        [nmTotal]="total"
        (nmIndexChange)="indexChange($event)"
        (nmActionClick)="actionClick($event)"
      ></nm-table>
    </div>
  `
})
class TestNmTableComponent {
  constructor(private cdr: ChangeDetectorRef) {}
  actions: NmTableAction[] = [
    { nmLabel: "播放全部", nmIcon: "fto-play" },
    { nmLabel: "下载", nmIcon: "fto-download" },
    { nmLabel: "批量操作", nmIcon: "fto-list" },
    {
      nmIcon: "fto-menu",
      nmTitle: "列表视图",
      nmActionLayoutType: "top-right-icon"
    },
    {
      nmIcon: "fto-user",
      nmTitle: "歌手视图",
      nmActionLayoutType: "top-right-icon"
    },
    {
      nmIcon: "fto-disc",
      nmTitle: "专辑视图",
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
    { nmKey: "song", nmLabel: "歌曲", nmFlex: 2 },
    { nmKey: "auth", nmLabel: "作者", nmFlex: 1 },
    { nmKey: "album", nmLabel: "专辑", nmFlex: 1 }
  ];
  list = Array.from({ length: 200 }).map((x, i) => {
    return {
      song: `${i + 1} Free Loop 福特轿车广告曲`,
      auth: "Daniel Powter",
      album: "Daniel Powter"
    };
  });
  chunks = _.chunk(this.list, 10);
  data = this.chunks[0];
  index = 1;
  size = 10;
  total = this.list.length;
  indexChange(index: number) {
    if (index <= this.chunks.length) {
      this.index = index;
      this.data = [...this.chunks[index - 1]];
      this.cdr.detectChanges();
    }
  }
  actionClick(action: NmTableAction) {
    console.log(action);
  }
}
