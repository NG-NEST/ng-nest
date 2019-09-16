import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NmExamplesComponent } from "./nm-examples.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NmExamplesModule } from "./nm-examples.module";
import { ExamplesPrefix } from "./nm-examples.type";

describe(ExamplesPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NmExamplesModule],
      declarations: [TestNmExamplesComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestNmExamplesComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNmExamplesComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(NmExamplesComponent));
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
    it("should className.", () => {
      fixture.detectChanges();
      expect(element.classList).toContain(ExamplesPrefix);
    });
  });
});

@Component({
  selector: "test-nm-examples",
  template: `
    <nm-examples>nm-examples</nm-examples>
  `
})
class TestNmExamplesComponent {}
