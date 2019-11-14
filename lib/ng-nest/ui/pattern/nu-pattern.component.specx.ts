import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NuPatternComponent } from "./nu-pattern.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NuPatternModule } from "./nu-pattern.module";
import { PatternPrefix } from "./nu-pattern.type";

describe(PatternPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NuPatternModule],
      declarations: [TestNuPatternComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestNuPatternComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNuPatternComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(NuPatternComponent));
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
    it("should className.", () => {
      fixture.detectChanges();
      expect(element.classList).toContain(PatternPrefix);
    });
  });
});

@Component({
  selector: "test-nu-Pattern",
  template: `
    <nu-pattern>nu-pattern</nu-pattern>
  `
})
class TestNuPatternComponent {}
