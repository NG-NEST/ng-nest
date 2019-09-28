import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NmButtonComponent } from "./nm-button.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NmButtonModule } from "./nm-button.module";
import { ButtonPrefix } from "./nm-button.type";

describe(ButtonPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NmButtonModule],
      declarations: [TestNmButtonComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestNmButtonComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNmButtonComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(
        By.directive(NmButtonComponent)
      );
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
    it("should className.", () => {
      fixture.detectChanges();
      expect(element.classList).toContain(ButtonPrefix);
    });
  });
});

@Component({
  selector: "test-nm-button",
  template: `
    <nm-button [nmLabel]="'按钮'"></nm-button>
  `
})
class TestNmButtonComponent {}
