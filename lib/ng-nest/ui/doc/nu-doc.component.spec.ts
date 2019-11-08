import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NuDocComponent } from "./nu-doc.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NuDocModule } from "./nu-doc.module";
import { DocPrefix } from "./nu-doc.type";

describe(DocPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NuDocModule],
      declarations: [TestNuDocComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestNuDocComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNuDocComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(NuDocComponent));
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
  selector: "test-nu-doc",
  template: `
    <nu-doc>nu-doc</nu-doc>
  `
})
class TestNuDocComponent {}
