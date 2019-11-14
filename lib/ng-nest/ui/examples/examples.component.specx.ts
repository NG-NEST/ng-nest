import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { XExamplesComponent } from "./examples.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { XExamplesModule } from "./examples.module";
import { ExamplesPrefix } from "./examples.type";

describe(ExamplesPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XExamplesModule],
      declarations: [TestXExamplesComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXExamplesComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXExamplesComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XExamplesComponent));
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
  selector: "test-x-examples",
  template: `
    <x-examples>x-examples</x-examples>
  `
})
class TestXExamplesComponent {}
