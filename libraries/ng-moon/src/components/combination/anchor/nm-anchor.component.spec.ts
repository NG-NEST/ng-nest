import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NmAnchorComponent } from "./nm-anchor.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NmAnchorModule } from "./nm-anchor.module";
import {
  AnchorPrefix,
  NmAnchorLayoutEnum,
  NmActivatedAnchor
} from "./nm-anchor.type";

describe(AnchorPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NmAnchorModule],
      declarations: [
        TestNmAnchorComponent,
        TestScrollNmAnchorComponent,
        TestUndefinedNmAnchorComponent
      ]
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
  describe(`element scroll.`, () => {
    let fixture: ComponentFixture<TestScrollNmAnchorComponent>;
    let testComponent: TestScrollNmAnchorComponent;
    let debugElement: DebugElement;
    let element: Element;
    let shadowRoot: DocumentFragment;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestScrollNmAnchorComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(
        By.directive(NmAnchorComponent)
      );
      element = debugElement.nativeElement;
      shadowRoot = element.shadowRoot;
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
    it("should activated anchor change.", () => {
      let index = 1;
      let activatedAnchor: NmActivatedAnchor;
      (debugElement.componentInstance as NmAnchorComponent).nmActivatedChange.subscribe(
        (x: NmActivatedAnchor) => (activatedAnchor = x)
      );
      let liEle = fixture.debugElement.query(
        By.css(`ul li:nth-child(${index + 1})`)
      );
      liEle.triggerEventHandler("click", null);
      expect(element.classList).toContain(AnchorPrefix);
    });
    it("should scroll change.", () => {
      (debugElement.componentInstance as NmAnchorComponent).setActiveatedIndex();
      fixture.detectChanges();
      expect(element.classList).toContain(AnchorPrefix);
    });
  });
  describe(`event.`, () => {
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
    it("should activated anchor change.", () => {
      let index = 1;
      let activatedAnchor: NmActivatedAnchor;
      (debugElement.componentInstance as NmAnchorComponent).nmActivatedChange.subscribe(
        (x: NmActivatedAnchor) => (activatedAnchor = x)
      );
      let liEle = fixture.debugElement.query(
        By.css(`ul li:nth-child(${index + 1})`)
      );
      liEle.triggerEventHandler("click", null);
      expect(activatedAnchor.nmActivatedIndex).toBe(index);
    });
    it("should scroll change.", () => {
      let index = 1;
      let activatedAnchor: NmActivatedAnchor;
      (debugElement.componentInstance as NmAnchorComponent).nmActivatedChange.subscribe(
        (x: NmActivatedAnchor) => (activatedAnchor = x)
      );
      let liEle = fixture.debugElement.query(
        By.css(`ul li:nth-child(${index + 1})`)
      );
      liEle.triggerEventHandler("click", null);
      expect(activatedAnchor.nmActivatedIndex).toBe(index);
    });
  });
  describe(`option undefined.`, () => {
    let fixture: ComponentFixture<TestUndefinedNmAnchorComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestUndefinedNmAnchorComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(
        By.directive(NmAnchorComponent)
      );
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
});

const htmlTemplate = `
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
</div>`;
@Component({
  selector: "test-nm-anchor",
  template: `
    <nm-anchor [nmLayout]="layout" style="padding-bottom:300px;">
      ${htmlTemplate}
    </nm-anchor>
  `
})
class TestNmAnchorComponent {
  layout: NmAnchorLayoutEnum;
}

@Component({
  selector: "test-nm-anchor",
  template: `
    <div class="scroll" #scroll style="height: 600px; overflow: auto">
      <div>
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
      <nm-anchor
        [nmScrollElement]="scroll"
        [nmLayout]="layout"
        style="padding-bottom:300px;"
      >
        ${htmlTemplate}
      </nm-anchor>
    </div>
  `
})
class TestScrollNmAnchorComponent {
  layout: NmAnchorLayoutEnum;
}

@Component({
  selector: "test-undefined-nm-anchor",
  template: `
    <nm-anchor></nm-anchor>
  `
})
class TestUndefinedNmAnchorComponent {}
