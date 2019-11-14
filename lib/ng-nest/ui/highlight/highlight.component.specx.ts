import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { XHighlightComponent } from "./highlight.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { XHighlightModule } from "./highlight.module";
import { HighlightPrefix } from "./highlight.type";

describe(HighlightPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XHighlightModule],
      declarations: [TestXHighlightComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXHighlightComponent>;
    let testComponent: TestXHighlightComponent;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXHighlightComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(
        By.directive(XHighlightComponent)
      );
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
    it("should className.", () => {
      fixture.detectChanges();
      expect(element.classList).toContain(HighlightPrefix);
    });
    it("should html code.", () => {
      testComponent.type = "html";
      testComponent.data = `<div class="code"></div>`;
      fixture.detectChanges();
      expect(element.classList).toContain(HighlightPrefix);
    });
    it("should data change 'undefined'.", () => {
      testComponent.dataXll = undefined;
      fixture.detectChanges();
      expect(element.classList).toContain(HighlightPrefix);
    });
  });
});

@Component({
  selector: "test-x-highlight",
  template: `
    <x-highlight [type]="type" [data]="data"></x-highlight>
    <x-highlight [data]="dataXll"></x-highlight>
  `
})
class TestXHighlightComponent {
  type: string = `html`;
  data: string = `<div class="html"></div>`;
  dataXll: string;
}
