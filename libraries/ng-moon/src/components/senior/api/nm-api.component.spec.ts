import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NmApiComponent } from "./nm-api.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NmApiModule } from "./nm-api.module";
import { ApiPrefix } from "./nm-api.type";

describe(ApiPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NmApiModule],
      declarations: [TestNmApiComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestNmApiComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNmApiComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(NmApiComponent));
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
    it("should className.", () => {
      fixture.detectChanges();
      expect(element.classList).toContain(ApiPrefix);
    });
  });
});

@Component({
  selector: "test-nm-api",
  template: `
    <nm-api>nm-api</nm-api>
  `
})
class TestNmApiComponent {}
