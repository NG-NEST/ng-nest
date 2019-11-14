import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { XDocComponent } from "./doc.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { XDocModule } from "./doc.module";
import { DocPrefix } from "./doc.type";

describe(DocPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XDocModule],
      declarations: [TestXDocComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXDocComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXDocComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XDocComponent));
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
  selector: "test-x-doc",
  template: `
    <x-doc>x-doc</x-doc>
  `
})
class TestXDocComponent {}
