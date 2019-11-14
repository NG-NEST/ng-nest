import { BehaviorSubject } from "rxjs";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { XTabsComponent } from "./tabs.component";
import {
  Component,
  DebugElement} from "@angular/core";
import { By } from "@angular/platform-browser";
import { XTabsModule } from "./tabs.module";
import {
  TabsPrefix,
  XTabsNode,
  XTabsLayoutType
} from "./tabs.type";
import { XData } from "@ng-nest/ui/core";

describe(TabsPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XTabsModule],
      declarations: [
        TestXTabsComponent,
        TestEventXTabsComponent,
        TestDataXTabsComponent
      ]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXTabsComponent>;
    let testComponent: TestXTabsComponent;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXTabsComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XTabsComponent));
      element = debugElement.nativeElement;
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

const testXTabsNode: XTabsNode[] = [
  { key: 1, label: "Home" },
  { key: 2, label: "Docs" },
  { key: 3, label: "Examples" },
  { key: 4, label: "Api" }
];

@Component({
  selector: "test-x-tabs",
  template: `
    <x-tabs [layout]="layout" [activatedIndex]="activatedIndex">
      <x-tab [label]="'Home'">
        <h1>1 Home</h1>
      </x-tab>
      <x-tab [label]="'Docs'">
        <h1>2 Docs</h1>
      </x-tab>
      <x-tab [label]="'Examples'">
        <h1>3 Theme</h1>
      </x-tab>
      <x-tab [label]="'Api'">
        <h1>4 Theme</h1>
      </x-tab>
    </x-tabs>
  `
})
class TestXTabsComponent {
  layout: XTabsLayoutType;
  position: XTabsLayoutType;
  activatedIndex: number = 0;
}

@Component({
  selector: "test-event-x-tabs",
  template: `
    <x-tabs
      [data]="data"
      (indexChange)="activatedChange($event)"
    ></x-tabs>
  `
})
class TestEventXTabsComponent {
  data: XData<XTabsNode[]> = testXTabsNode;
  activatedChange() {}
}

@Component({
  selector: "test-data-x-tabs",
  template: `
    <x-tabs [data]="data"></x-tabs>
  `
})
class TestDataXTabsComponent {
  data: XData<XTabsNode[]> = new BehaviorSubject([]);
}
