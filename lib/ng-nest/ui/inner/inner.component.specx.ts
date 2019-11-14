import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { XInnerComponent } from "./inner.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { XInnerModule } from "./inner.module";
import { InnerPrefix } from "./inner.type";

describe(InnerPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XInnerModule],
      declarations: [TestXInnerComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXInnerComponent>;
    let testComponent: TestXInnerComponent;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXInnerComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XInnerComponent));
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
  selector: "test-x-inner",
  template: `
    <x-inner [padding]="padding">x-inner</x-inner>
  `
})
class TestXInnerComponent {
  padding: string = "1rem";
}
