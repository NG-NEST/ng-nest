import { BehaviorSubject } from "rxjs";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NuCrumbComponent } from "./nu-crumb.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NuCrumbModule } from "./nu-crumb.module";
import { CrumbPrefix, NuCrumbNode } from "./nu-crumb.type";
import { NuData } from "@ng-nest/ui/core";

describe(CrumbPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NuCrumbModule],
      declarations: [TestNuCrumbComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestNuCrumbComponent>;
    let testComponent: TestNuCrumbComponent;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNuCrumbComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(NuCrumbComponent));
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

const testNuCrumbNode: NuCrumbNode[] = [
  { nuKey: 1, nuLabel: "Home" },
  { nuKey: 2, nuLabel: "Docs" },
  { nuKey: 3, nuLabel: "Examples" },
  { nuKey: 4, nuLabel: "Api" }
];

@Component({
  selector: "test-nu-crumb",
  template: `
    <nu-crumb [nuData]="data" (nuNodeClick)="nodeClick($event)"></nu-crumb>
  `
})
class TestNuCrumbComponent {
  data: NuData<NuCrumbNode[]> = testNuCrumbNode;
  nodeClick(option) {

  }
}
