import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NuAnchorComponent } from "./nu-anchor.component";
import { Component, DebugElement, Inject } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NuAnchorModule } from "./nu-anchor.module";
import {
  AnchorPrefix,
  NuActivatedAnchor,
  NuAnchorLayoutType
} from "./nu-anchor.type";
import { DOCUMENT } from "@angular/common";

describe(AnchorPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NuAnchorModule],
      declarations: [
        TestNuAnchorComponent,
        TestScrollNuAnchorComponent,
        TestScrollFixedNuAnchorComponent,
        TestUndefinedNuAnchorComponent
      ]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestNuAnchorComponent>;
    let testComponent: TestNuAnchorComponent;
    let debugElement: DebugElement;
    let element: Element;
    let shadowRoot: DocumentFragment;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNuAnchorComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(
        By.directive(NuAnchorComponent)
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
    let fixture: ComponentFixture<TestScrollNuAnchorComponent>;
    let testComponent: TestScrollNuAnchorComponent;
    let debugElement: DebugElement;
    let element: Element;
    let shadowRoot: DocumentFragment;
    let anchorComponent: NuAnchorComponent;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestScrollNuAnchorComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(
        By.directive(NuAnchorComponent)
      );
      element = debugElement.nativeElement;
      shadowRoot = element.shadowRoot;
      anchorComponent = debugElement.componentInstance as NuAnchorComponent;
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
      let activatedAnchor: NuActivatedAnchor;
      (debugElement.componentInstance as NuAnchorComponent).nuActivatedChange.subscribe(
        (x: NuActivatedAnchor) => (activatedAnchor = x)
      );
      let liEle = fixture.debugElement.query(
        By.css(`ul li:nth-child(${index + 1})`)
      );
      liEle.triggerEventHandler("click", null);
      expect(activatedAnchor.nuActivatedIndex).toBe(index);
    });
    it("should scroll change.", () => {
      anchorComponent.setActiveatedIndex();
      (anchorComponent.nuScrollElement as HTMLElement).scrollTop = 400;
      testComponent.doc.documentElement.scrollTop = 300;
      fixture.detectChanges();
      expect(element.classList).toContain(AnchorPrefix);
    });
  });
  describe(`event.`, () => {
    let fixture: ComponentFixture<TestNuAnchorComponent>;
    let testComponent: TestNuAnchorComponent;
    let debugElement: DebugElement;
    let element: Element;
    let shadowRoot: DocumentFragment;
    let anchorComponent: NuAnchorComponent;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNuAnchorComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(
        By.directive(NuAnchorComponent)
      );
      element = debugElement.nativeElement;
      shadowRoot = element.shadowRoot;
      anchorComponent = debugElement.componentInstance as NuAnchorComponent;
    });
    it("should activated anchor change.", () => {
      let index = 1;
      let activatedAnchor: NuActivatedAnchor;
      anchorComponent.nuActivatedChange.subscribe(
        (x: NuActivatedAnchor) => (activatedAnchor = x)
      );
      let liEle = fixture.debugElement.query(
        By.css(`ul li:nth-child(${index + 1})`)
      );
      liEle.triggerEventHandler("click", null);
      expect(activatedAnchor.nuActivatedIndex).toBe(index);
    });
    it("should scroll change.", () => {
      let index = 1;
      let activatedAnchor: NuActivatedAnchor;
      anchorComponent.nuActivatedChange.subscribe(
        (x: NuActivatedAnchor) => (activatedAnchor = x)
      );
      let liEle = fixture.debugElement.query(
        By.css(`ul li:nth-child(${index + 1})`)
      );
      liEle.triggerEventHandler("click", null);
      expect(activatedAnchor.nuActivatedIndex).toBe(index);
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
    let fixture: ComponentFixture<TestScrollFixedNuAnchorComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestScrollFixedNuAnchorComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(
        By.directive(NuAnchorComponent)
      );
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`option undefined.`, () => {
    let fixture: ComponentFixture<TestUndefinedNuAnchorComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestUndefinedNuAnchorComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(
        By.directive(NuAnchorComponent)
      );
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
});

const htmlTemplate = `
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
  <div><h5>Branching</h5></div>
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
  <p>This is a branch and a description.</p>`;
@Component({
  selector: "test-nu-anchor",
  template: `
    <nu-anchor [nuLayout]="layout" [nuTop]="8" [nuSliderFixed]="true">
      ${htmlTemplate}
    </nu-anchor>
  `
})
class TestNuAnchorComponent {
  layout: NuAnchorLayoutType;
  constructor(@Inject(DOCUMENT) public doc: any) {}
}

@Component({
  selector: "test-nu-anchor",
  template: `
    <div class="scroll" #scroll style="height: 600px; overflow: auto">
      <div>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
      </div>
      <nu-anchor
        [nuScrollElement]="scroll"
        [nuLayout]="layout"
        style="padding-bottom:300px;"
      >
        ${htmlTemplate}
      </nu-anchor>
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
class TestScrollNuAnchorComponent {
  layout: NuAnchorLayoutType;
  constructor(@Inject(DOCUMENT) public doc: any) {}
}

@Component({
  selector: "test-scroll-fixed-nu-anchor",
  template: `
    <div class="scroll-fixed">
      <div class="scroll" #scroll style="height: 600px; overflow: auto">
        <div>
          <p>This is a branch and a description.</p>
          <p>This is a branch and a description.</p>
          <p>This is a branch and a description.</p>
          <p>This is a branch and a description.</p>
        </div>
        <nu-anchor
          [nuScrollElement]="scroll"
          [nuLayout]="layout"
          style="padding-bottom:300px;"
        >
          ${htmlTemplate}
        </nu-anchor>
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
class TestScrollFixedNuAnchorComponent {
  layout: NuAnchorLayoutType;
  constructor(@Inject(DOCUMENT) public doc: any) {}
}

@Component({
  selector: "test-undefined-nu-anchor",
  template: `
    <nu-anchor></nu-anchor>
  `
})
class TestUndefinedNuAnchorComponent {}
