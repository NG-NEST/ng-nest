import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NuExamplesComponent } from "./nu-examples.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NuExamplesModule } from "./nu-examples.module";
import { ExamplesPrefix } from "./nu-examples.type";

describe(ExamplesPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NuExamplesModule],
      declarations: [TestNuExamplesComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestNuExamplesComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNuExamplesComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(NuExamplesComponent));
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
  selector: "test-nu-examples",
  template: `
    <nu-examples>nu-examples</nu-examples>
  `
})
class TestNuExamplesComponent {}
