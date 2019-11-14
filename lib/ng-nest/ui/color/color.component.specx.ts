import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { XColorComponent } from "./color.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { XColorModule } from "./color.module";
import { ColorPrefix } from "./color.type";

describe(ColorPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XColorModule],
      declarations: [TestXColorComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXColorComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXColorComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XColorComponent));
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  selector: "test-x-color",
  template: `
    <x-color></x-color>

  `
})
class TestXColorComponent {}
