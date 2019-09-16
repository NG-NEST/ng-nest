import { Observable, Subject, BehaviorSubject } from "rxjs";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NmTabsComponent } from "./nm-tabs.component";
import {
  Component,
  DebugElement,
  ContentChildren,
  ViewChildren
} from "@angular/core";
import { By } from "@angular/platform-browser";
import { NmTabsModule } from "./nm-tabs.module";
import {
  TabsPrefix,
  NmTabsNode,
  NmTabsLayoutType,
  NmActivatedTab
} from "./nm-tabs.type";
import { NmData } from "../../../interfaces/data.type";

describe(TabsPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NmTabsModule],
      declarations: [
        TestNmTabsComponent,
        TestEventNmTabsComponent,
        TestDataNmTabsComponent
      ]
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
      testComponent.layout = "top";
      fixture.detectChanges();
      expect(element.classList).toContain(`${TabsPrefix}-top`);
    });
    it("should layout right.", () => {
      testComponent.layout = "right";
      fixture.detectChanges();
      expect(element.classList).toContain(`${TabsPrefix}-right`);
    });
    it("should layout bottom.", () => {
      testComponent.layout = "bottom";
      fixture.detectChanges();
      expect(element.classList).toContain(`${TabsPrefix}-bottom`);
    });
    it("should layout left.", () => {
      testComponent.layout = "left";
      fixture.detectChanges();
      expect(element.classList).toContain(`${TabsPrefix}-left`);
    });
    it("should activatedIndex 1.", () => {
      testComponent.activatedIndex = 1;
      fixture.detectChanges();
      expect(element.classList).toContain(TabsPrefix);
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
    <nm-tabs [nmLayout]="layout" [nmActivatedIndex]="activatedIndex">
      <nm-tab [nmLabel]="'Home'">
        <h1>1 Home</h1>
      </nm-tab>
      <nm-tab [nmLabel]="'Docs'">
        <h1>2 Docs</h1>
      </nm-tab>
      <nm-tab [nmLabel]="'Examples'">
        <h1>3 Theme</h1>
      </nm-tab>
      <nm-tab [nmLabel]="'Api'">
        <h1>4 Theme</h1>
      </nm-tab>
    </nm-tabs>
  `
})
class TestNmTabsComponent {
  layout: NmTabsLayoutType;
  position: NmTabsLayoutType;
  activatedIndex: number = 0;
}

@Component({
  selector: "test-event-nm-tabs",
  template: `
    <nm-tabs
      [nmData]="data"
      (nmActivatedChange)="activatedChange($event)"
    ></nm-tabs>
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
