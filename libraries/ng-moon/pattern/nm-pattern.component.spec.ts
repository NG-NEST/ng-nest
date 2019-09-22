import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NmPatternComponent } from "./nm-pattern.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NmPatternModule } from "./nm-pattern.module";
import { PatternPrefix } from "./nm-pattern.type";

describe(PatternPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NmPatternModule],
      declarations: [TestNmPatternComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestNmPatternComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNmPatternComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(NmPatternComponent));
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
  selector: "test-nm-Pattern",
  template: `
    <nm-pattern>nm-pattern</nm-pattern>
  `
})
class TestNmPatternComponent {}
