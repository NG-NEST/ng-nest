import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NuHighlightComponent } from "./nu-highlight.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NuHighlightModule } from "./nu-highlight.module";
import { HighlightPrefix } from "./nu-highlight.type";

describe(HighlightPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NuHighlightModule],
      declarations: [TestNuHighlightComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestNuHighlightComponent>;
    let testComponent: TestNuHighlightComponent;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNuHighlightComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(
        By.directive(NuHighlightComponent)
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
  selector: "test-nu-highlight",
  template: `
    <nu-highlight [nuType]="type" [nuData]="data"></nu-highlight>
    <nu-highlight [nuData]="dataNull"></nu-highlight>
  `
})
class TestNuHighlightComponent {
  type: string = `html`;
  data: string = `<div class="html"></div>`;
  dataNull: string;
}
