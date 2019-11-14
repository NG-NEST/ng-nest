import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { XPatternComponent } from "./pattern.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { XPatternModule } from "./pattern.module";
import { PatternPrefix } from "./pattern.type";

describe(PatternPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XPatternModule],
      declarations: [TestXPatternComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXPatternComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXPatternComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XPatternComponent));
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
  selector: "test-x-Pattern",
  template: `
    <x-pattern>x-pattern</x-pattern>
  `
})
class TestXPatternComponent {}
