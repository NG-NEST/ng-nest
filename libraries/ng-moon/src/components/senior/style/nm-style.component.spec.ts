import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NmStyleComponent } from "./nm-style.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NmStyleModule } from "./nm-style.module";
import { StylePrefix } from "./nm-style.type";

describe(StylePrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NmStyleModule],
      declarations: [TestNmStyleComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestNmStyleComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNmStyleComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(NmStyleComponent));
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
    it("should className.", () => {
      fixture.detectChanges();
      expect(element.classList).toContain(StylePrefix);
    });
  });
});

@Component({
  selector: "test-nm-style",
  template: `
    <nm-style>nm-style</nm-style>
  `
})
class TestNmStyleComponent {}
