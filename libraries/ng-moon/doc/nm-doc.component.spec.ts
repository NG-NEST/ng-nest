import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NmDocComponent } from "./nm-doc.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NmDocModule } from "./nm-doc.module";
import { DocPrefix } from "./nm-doc.type";

describe(DocPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NmDocModule],
      declarations: [TestNmDocComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestNmDocComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNmDocComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(NmDocComponent));
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
    it("should className.", () => {
      fixture.detectChanges();
      expect(element.classList).toContain(DocPrefix);
    });
  });
});

@Component({
  selector: "test-nm-doc",
  template: `
    <nm-doc>nm-doc</nm-doc>
  `
})
class TestNmDocComponent {}
