import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NmAnchorComponent } from "./nm-anchor.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NmAnchorModule } from "./nm-anchor.module";
import { AnchorPrefix } from "./nm-anchor.type";

describe(AnchorPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NmAnchorModule],
      declarations: [TestNmAnchorComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestNmAnchorComponent>;
    let testComponent: TestNmAnchorComponent;
    let debugElement: DebugElement;
    let element: Element;
    let shadowRoot: DocumentFragment;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNmAnchorComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(
        By.directive(NmAnchorComponent)
      );
      element = debugElement.nativeElement;
      shadowRoot = element.shadowRoot;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
    it("should className.", () => {
      fixture.detectChanges();
      expect(element.classList).toContain(AnchorPrefix);
    });
  });
});

@Component({
  selector: "test-nm-anchor",
  template: `
    <div nm-anchor>
      主题1
      <h2>分支</h2>
      <h2>分支</h2>
      <h2>分支</h2>
      <h1>主题2</h1>
      <h2>分支</h2>
      <h2>分支</h2>
      <h2>分支</h2>
      <h2>分支</h2>
    </div>
  `
})
class TestNmAnchorComponent {}
