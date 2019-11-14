import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NuColorComponent } from "./nu-color.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NuColorModule } from "./nu-color.module";
import { ColorPrefix } from "./nu-color.type";

describe(ColorPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NuColorModule],
      declarations: [TestNuColorComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestNuColorComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNuColorComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(NuColorComponent));
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  selector: "test-nu-color",
  template: `
    <nu-color></nu-color>

  `
})
class TestNuColorComponent {}
