import { BehaviorSubject } from "rxjs";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NmCrumbComponent } from "./nm-crumb.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NmCrumbModule } from "./nm-crumb.module";
import { CrumbPrefix, NmCrumbNode } from "./nm-crumb.type";
import { NmData } from "ng-moon/core";

describe(CrumbPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NmCrumbModule],
      declarations: [TestNmCrumbComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestNmCrumbComponent>;
    let testComponent: TestNmCrumbComponent;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNmCrumbComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(NmCrumbComponent));
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
    it("should className.", () => {
      fixture.detectChanges();
      expect(element.classList).toContain(CrumbPrefix);
    });
  });
});

const testNmCrumbNode: NmCrumbNode[] = [
  { nmKey: 1, nmLabel: "Home" },
  { nmKey: 2, nmLabel: "Docs" },
  { nmKey: 3, nmLabel: "Examples" },
  { nmKey: 4, nmLabel: "Api" }
];

@Component({
  selector: "test-nm-crumb",
  template: `
    <nm-crumb [nmData]="data" (nmNodeClick)="nodeClick($event)"></nm-crumb>
  `
})
class TestNmCrumbComponent {
  data: NmData<NmCrumbNode[]> = testNmCrumbNode;
  nodeClick(option) {
    console.log(option);
  }
}
