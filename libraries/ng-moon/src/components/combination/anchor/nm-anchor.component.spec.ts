import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NmAnchorComponent } from "./nm-anchor.component";
import { Component, DebugElement, Inject } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NmAnchorModule } from "./nm-anchor.module";
import {
  AnchorPrefix,
  NmActivatedAnchor,
  NmAnchorLayoutType
} from "./nm-anchor.type";
import { DOCUMENT } from "@angular/common";

describe(AnchorPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NmAnchorModule],
      declarations: [
        TestNmAnchorComponent,
        TestScrollNmAnchorComponent,
        TestScrollFixedNmAnchorComponent,
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
      testComponent.layout = "left";
      fixture.detectChanges();
      expect(element.classList).toContain(`${AnchorPrefix}-left`);
    });
    it("should layout right.", () => {
      testComponent.layout = "right";
      fixture.detectChanges();
      expect(element.classList).toContain(`${AnchorPrefix}-right`);
    });
  });
  describe(`element scroll.`, () => {
    let fixture: ComponentFixture<TestScrollNmAnchorComponent>;
    let testComponent: TestScrollNmAnchorComponent;
    let debugElement: DebugElement;
    let element: Element;
    let shadowRoot: DocumentFragment;
    let anchorComponent: NmAnchorComponent;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestScrollNmAnchorComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(
        By.directive(NmAnchorComponent)
      );
      element = debugElement.nativeElement;
      shadowRoot = element.shadowRoot;
      anchorComponent = debugElement.componentInstance as NmAnchorComponent;
    });
    it("should layout left.", () => {
      testComponent.layout = "left";
      fixture.detectChanges();
      expect(element.classList).toContain(`${AnchorPrefix}-${"left"}`);
    });
    it("should layout right.", () => {
      testComponent.layout = "right";
      fixture.detectChanges();
      expect(element.classList).toContain(`${AnchorPrefix}-${"right"}`);
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
      anchorComponent.setActiveatedIndex();
      (anchorComponent.nmScrollElement as HTMLElement).scrollTop = 400;
      testComponent.doc.documentElement.scrollTop = 300;
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
    let anchorComponent: NmAnchorComponent;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNmAnchorComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(
        By.directive(NmAnchorComponent)
      );
      element = debugElement.nativeElement;
      shadowRoot = element.shadowRoot;
      anchorComponent = debugElement.componentInstance as NmAnchorComponent;
    });
    it("should activated anchor change.", () => {
      let index = 1;
      let activatedAnchor: NmActivatedAnchor;
      anchorComponent.nmActivatedChange.subscribe(
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
      anchorComponent.nmActivatedChange.subscribe(
        (x: NmActivatedAnchor) => (activatedAnchor = x)
      );
      let liEle = fixture.debugElement.query(
        By.css(`ul li:nth-child(${index + 1})`)
      );
      liEle.triggerEventHandler("click", null);
      expect(activatedAnchor.nmActivatedIndex).toBe(index);
    });
    // it("should window size change.", () => {
    //   let doc = fixture.elementRef.nativeElement.ownerDocument;
    //   let resize = doc.createEvent("resize");
    //   doc.dispatchEvent(resize);
    //   // fixture.debugElement.triggerEventHandler("resize", null);
    //   expect(element.classList).toContain(AnchorPrefix);
    // });
  });
  describe(`scroll-fixed.`, () => {
    let fixture: ComponentFixture<TestScrollFixedNmAnchorComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestScrollFixedNmAnchorComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(
        By.directive(NmAnchorComponent)
      );
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
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
    <nm-anchor [nmLayout]="layout" style="padding-bottom:600px;">
      ${htmlTemplate}
    </nm-anchor>
  `
})
class TestNmAnchorComponent {
  layout: NmAnchorLayoutType;
  constructor(@Inject(DOCUMENT) public doc: any) {}
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
      </div>
      <nm-anchor
        [nmScrollElement]="scroll"
        [nmLayout]="layout"
        style="padding-bottom:300px;"
      >
        ${htmlTemplate}
      </nm-anchor>
    </div>
    <div>
      <p>This is a branch and a description.</p>
      <p>This is a branch and a description.</p>
      <p>This is a branch and a description.</p>
      <p>This is a branch and a description.</p>
      <p>This is a branch and a description.</p>
    </div>
  `
})
class TestScrollNmAnchorComponent {
  layout: NmAnchorLayoutType;
  constructor(@Inject(DOCUMENT) public doc: any) {}
}

@Component({
  selector: "test-scroll-fixed-nm-anchor",
  template: `
    <div class="scroll-fixed">
      <div class="scroll" #scroll style="height: 600px; overflow: auto">
        <div>
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
      <div>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
      </div>
    </div>
  `,
  styles: [
    `
      .scroll-fixed {
        top: 3.75rem;
        left: 0;
        height: calc(100% - 3.75rem);
        position: fixed;
        overflow: auto;
        width: 100%;
        display: block;
      }
    `
  ]
})
class TestScrollFixedNmAnchorComponent {
  layout: NmAnchorLayoutType;
  constructor(@Inject(DOCUMENT) public doc: any) {}
}

@Component({
  selector: "test-undefined-nm-anchor",
  template: `
    <nm-anchor></nm-anchor>
  `
})
class TestUndefinedNmAnchorComponent {}
