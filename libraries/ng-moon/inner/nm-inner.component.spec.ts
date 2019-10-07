import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NmInnerComponent } from "./nm-inner.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NmInnerModule } from "./nm-inner.module";
import { InnerPrefix } from "./nm-inner.type";

describe(InnerPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NmInnerModule],
      declarations: [TestNmInnerComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestNmInnerComponent>;
    let testComponent: TestNmInnerComponent;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNmInnerComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(NmInnerComponent));
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
  selector: "test-nm-inner",
  template: `
    <nm-inner [nmPadding]="padding">nm-inner</nm-inner>
  `
})
class TestNmInnerComponent {
  padding: string = "1rem";
}
