import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NmHighlightComponent } from "./nm-highlight.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NmHighlightModule } from "./nm-highlight.module";
import { HighlightPrefix } from "./nm-highlight.type";

describe(HighlightPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NmHighlightModule],
      declarations: [TestNmHighlightComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestNmHighlightComponent>;
    let testComponent: TestNmHighlightComponent;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNmHighlightComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(
        By.directive(NmHighlightComponent)
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
      testComponent.dataNull = undefined;
      fixture.detectChanges();
      expect(element.classList).toContain(HighlightPrefix);
    });
  });
});

@Component({
  selector: "test-nm-highlight",
  template: `
    <nm-highlight [nmType]="type" [nmData]="data"></nm-highlight>
    <nm-highlight [nmData]="dataNull"></nm-highlight>
  `
})
class TestNmHighlightComponent {
  type: string = `html`;
  data: string = `<div class="html"></div>`;
  dataNull: string;
}
