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
    <div nm-anchor style="padding-bottom:300px;">
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
      <h1>8 Theme</h1>
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
      <h1>9 Theme</h1>
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
      <h1>10 Theme</h1>
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
      <h1>11 Theme</h1>
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
      <h1>12 Theme</h1>
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
      <h1>14 Theme</h1>
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
      <h1>16 Theme</h1>
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
      <h1>18 Theme</h1>
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
  `
})
class TestNmAnchorComponent {}
