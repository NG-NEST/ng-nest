import { BehaviorSubject } from "rxjs";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NuTabsComponent } from "./nu-tabs.component";
import {
  Component,
  DebugElement} from "@angular/core";
import { By } from "@angular/platform-browser";
import { NuTabsModule } from "./nu-tabs.module";
import {
  TabsPrefix,
  NuTabsNode,
  NuTabsLayoutType
} from "./nu-tabs.type";
import { NuData } from "@ng-nest/ui/core";

describe(TabsPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NuTabsModule],
      declarations: [
        TestNuTabsComponent,
        TestEventNuTabsComponent,
        TestDataNuTabsComponent
      ]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestNuTabsComponent>;
    let testComponent: TestNuTabsComponent;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNuTabsComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(NuTabsComponent));
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

const testNuTabsNode: NuTabsNode[] = [
  { nuKey: 1, nuLabel: "Home" },
  { nuKey: 2, nuLabel: "Docs" },
  { nuKey: 3, nuLabel: "Examples" },
  { nuKey: 4, nuLabel: "Api" }
];

@Component({
  selector: "test-nu-tabs",
  template: `
    <nu-tabs [nuLayout]="layout" [nuActivatedIndex]="activatedIndex">
      <nu-tab [nuLabel]="'Home'">
        <h1>1 Home</h1>
      </nu-tab>
      <nu-tab [nuLabel]="'Docs'">
        <h1>2 Docs</h1>
      </nu-tab>
      <nu-tab [nuLabel]="'Examples'">
        <h1>3 Theme</h1>
      </nu-tab>
      <nu-tab [nuLabel]="'Api'">
        <h1>4 Theme</h1>
      </nu-tab>
    </nu-tabs>
  `
})
class TestNuTabsComponent {
  layout: NuTabsLayoutType;
  position: NuTabsLayoutType;
  activatedIndex: number = 0;
}

@Component({
  selector: "test-event-nu-tabs",
  template: `
    <nu-tabs
      [nuData]="data"
      (nuActivatedChange)="activatedChange($event)"
    ></nu-tabs>
  `
})
class TestEventNuTabsComponent {
  data: NuData<NuTabsNode[]> = testNuTabsNode;
  activatedChange() {}
}

@Component({
  selector: "test-data-nu-tabs",
  template: `
    <nu-tabs [nuData]="data"></nu-tabs>
  `
})
class TestDataNuTabsComponent {
  data: NuData<NuTabsNode[]> = new BehaviorSubject([]);
}
