import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NmGridComponent } from "./nm-grid.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NmGridModule } from "./nm-grid.module";
import { GridPrefix } from "./nm-grid.type";

describe(GridPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NmGridModule],
      declarations: [TestNmGridComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestNmGridComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNmGridComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(NmGridComponent));
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
    it("should className.", () => {
      fixture.detectChanges();
      expect(element.classList).toContain(GridPrefix);
    });
  });
});

@Component({
  selector: "test-nm-grid",
  template: `
    <nm-grid>nm-grid</nm-grid>
  `
})
class TestNmGridComponent {}
