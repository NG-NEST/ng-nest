import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NuApiComponent } from "./nu-api.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NuApiModule } from "./nu-api.module";
import { ApiPrefix } from "./nu-api.type";

describe(ApiPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NuApiModule],
      declarations: [TestNuApiComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestNuApiComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNuApiComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(NuApiComponent));
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
  selector: "test-nu-api",
  template: `
    <nu-api>nu-api</nu-api>
  `
})
class TestNuApiComponent {}
