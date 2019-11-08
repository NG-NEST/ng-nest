import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NuInnerComponent } from "./nu-inner.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NuInnerModule } from "./nu-inner.module";
import { InnerPrefix } from "./nu-inner.type";

describe(InnerPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NuInnerModule],
      declarations: [TestNuInnerComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestNuInnerComponent>;
    let testComponent: TestNuInnerComponent;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNuInnerComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(NuInnerComponent));
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
    it("should className.", () => {
      fixture.detectChanges();
      expect(element.classList).toContain(InnerPrefix);
    });
    it("change padding.", () => {
      testComponent.padding = "1rem 0";
      fixture.detectChanges();
      expect(element.classList).toContain(InnerPrefix);
    });
  });
});

@Component({
  selector: "test-nu-inner",
  template: `
    <nu-inner [nuPadding]="padding">nu-inner</nu-inner>
  `
})
class TestNuInnerComponent {
  padding: string = "1rem";
}
