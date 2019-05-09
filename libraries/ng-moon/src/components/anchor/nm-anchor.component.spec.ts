import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NmAnchorComponent } from "./nm-anchor.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NmAnchorModule } from "./nm-anchor.module";
import { AnchorPrefix, NmAnchorLayoutEnum } from "./nm-anchor.type";

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
    it("should layout left.", () => {
      testComponent.layout = NmAnchorLayoutEnum.Left;
      fixture.detectChanges();
      expect(element.classList).toContain(
        `${AnchorPrefix}-${NmAnchorLayoutEnum.Left}`
      );
    });
    it("should layout right.", () => {
      testComponent.layout = NmAnchorLayoutEnum.Right;
      fixture.detectChanges();
      expect(element.classList).toContain(
        `${AnchorPrefix}-${NmAnchorLayoutEnum.Right}`
      );
    });
  });
});

@Component({
  selector: "test-nm-anchor",
  template: `
    <nm-anchor [nmLayout]="layout" style="padding-bottom:300px;">
      <div style="padding: 1rem">
        <h1>1 Theme</h1>
        <p>
          This is the topic-one information.
        </p>
        <p>
          This is the topic-one information.
        </p>
        <p>
          This is the topic-one information.
        </p>
        <h2>Branching</h2>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <h2>Branching</h2>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <h1>2 Theme</h1>
        <p>
          This is the topic-one information.
        </p>
        <p>
          This is the topic-one information.
        </p>
        <p>
          This is the topic-one information.
        </p>
        <h2>Branching</h2>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <h2>Branching</h2>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <h1>3 Theme</h1>
        <p>
          This is the topic-one information.
        </p>
        <p>
          This is the topic-one information.
        </p>
        <p>
          This is the topic-one information.
        </p>
        <h2>Branching</h2>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <h2>Branching</h2>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <h1>4 Theme</h1>
        <p>
          This is the topic-one information.
        </p>
        <p>
          This is the topic-one information.
        </p>
        <p>
          This is the topic-one information.
        </p>
        <h2>Branching</h2>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <h2>Branching</h2>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <h1>5 Theme</h1>
        <p>
          This is the topic-one information.
        </p>
        <p>
          This is the topic-one information.
        </p>
        <p>
          This is the topic-one information.
        </p>
        <h2>Branching</h2>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <h2>Branching</h2>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <h1>6 Theme</h1>
        <p>
          This is the topic-one information.
        </p>
        <p>
          This is the topic-one information.
        </p>
        <p>
          This is the topic-one information.
        </p>
        <h2>Branching</h2>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <h2>Branching</h2>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <h1>7 Theme</h1>
        <p>
          This is the topic-one information.
        </p>
        <p>
          This is the topic-one information.
        </p>
        <p>
          This is the topic-one information.
        </p>
        <h2>Branching</h2>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <h2>Branching</h2>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
      </div>
    </nm-anchor>
  `
})
class TestNmAnchorComponent {
  layout: NmAnchorLayoutEnum;
}
