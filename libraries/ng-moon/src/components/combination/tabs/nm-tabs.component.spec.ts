import { Observable, Subject, BehaviorSubject } from "rxjs";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NmTabsComponent } from "./nm-tabs.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NmTabsModule } from "./nm-tabs.module";
import { TabsPrefix, NmTabsNode, NmTabsLayoutEnum, NmActivatedTabs } from "./nm-tabs.type";
import { NmData } from "../../../interfaces/data.type";

describe(TabsPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NmTabsModule],
      declarations: [TestNmTabsComponent, TestEventNmTabsComponent, TestDataNmTabsComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestNmTabsComponent>;
    let testComponent: TestNmTabsComponent;
    let debugElement: DebugElement;
    let element: Element;
    let shadowRoot: DocumentFragment;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNmTabsComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(NmTabsComponent));
      element = debugElement.nativeElement;
      shadowRoot = element.shadowRoot;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
    it("should className.", () => {
      fixture.detectChanges();
      expect(element.classList).toContain(TabsPrefix);
    });
    it("should layout top.", () => {
      testComponent.layout = NmTabsLayoutEnum.Top;
      fixture.detectChanges();
      expect(element.classList).toContain(`${TabsPrefix}-${NmTabsLayoutEnum.Top}`);
    });
    it("should layout right.", () => {
      testComponent.layout = NmTabsLayoutEnum.Right;
      fixture.detectChanges();
      expect(element.classList).toContain(`${TabsPrefix}-${NmTabsLayoutEnum.Right}`);
    });
    it("should layout bottom.", () => {
      testComponent.layout = NmTabsLayoutEnum.Bottom;
      fixture.detectChanges();
      expect(element.classList).toContain(`${TabsPrefix}-${NmTabsLayoutEnum.Bottom}`);
    });
    it("should layout left.", () => {
      testComponent.layout = NmTabsLayoutEnum.Left;
      fixture.detectChanges();
      expect(element.classList).toContain(`${TabsPrefix}-${NmTabsLayoutEnum.Left}`);
    });
  });
});

const testNmTabsNode: NmTabsNode[] = [
  { nmKey: 1, nmLabel: "Home" },
  { nmKey: 2, nmLabel: "Docs" },
  { nmKey: 3, nmLabel: "Examples" },
  { nmKey: 4, nmLabel: "Api" }
];

@Component({
  selector: "test-nm-tabs",
  template: `
    <nm-tabs [nmLayout]="layout">
      <nm-tab [nmLabel]="'Home'">
        <nm-tabs [nmLayout]="'top'">
          <nm-tab [nmLabel]="'Home'"><h1>1 Theme</h1></nm-tab>
          <nm-tab [nmLabel]="'Docs'"><h1>2 Theme</h1></nm-tab>
          <nm-tab [nmLabel]="'Examples'"><h1>3 Theme</h1></nm-tab>
          <nm-tab [nmLabel]="'Api'"><h1>4 Theme</h1></nm-tab>
        </nm-tabs>
      </nm-tab>
      <nm-tab [nmLabel]="'Docs'">
        <nm-tabs [nmLayout]="'top'">
          <nm-tab [nmLabel]="'Home'"><h1>1 Theme</h1></nm-tab>
          <nm-tab [nmLabel]="'Docs'"><h1>2 Theme</h1></nm-tab>
          <nm-tab [nmLabel]="'Examples'"><h1>3 Theme</h1></nm-tab>
          <nm-tab [nmLabel]="'Api'"><h1>4 Theme</h1></nm-tab>
        </nm-tabs>
      </nm-tab>
      <nm-tab [nmLabel]="'Examples'"><h1>3 Theme</h1></nm-tab>
      <nm-tab [nmLabel]="'Api'"><h1>4 Theme</h1></nm-tab>
    </nm-tabs>
  `
})
class TestNmTabsComponent {
  layout: NmTabsLayoutEnum;
  position: NmTabsLayoutEnum;
}

@Component({
  selector: "test-event-nm-tabs",
  template: `
    <nm-tabs [nmData]="data" (nmActivatedChange)="activatedChange($event)"></nm-tabs>
  `
})
class TestEventNmTabsComponent {
  data: NmData<NmTabsNode[]> = testNmTabsNode;
  activatedChange($event: any) {}
}

@Component({
  selector: "test-data-nm-tabs",
  template: `
    <nm-tabs [nmData]="data"></nm-tabs>
  `
})
class TestDataNmTabsComponent {
  data: NmData<NmTabsNode[]> = new BehaviorSubject([]);
}
