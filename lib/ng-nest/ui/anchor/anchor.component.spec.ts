import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { XAnchorComponent } from "./anchor.component";
import { Component, DebugElement, Inject } from "@angular/core";
import { By } from "@angular/platform-browser";
import { XAnchorModule } from "./anchor.module";
import {
  AnchorPrefix,
  XActivatedAnchor,
  XAnchorLayoutType
} from "./anchor.type";
import { DOCUMENT } from "@angular/common";

describe(AnchorPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XAnchorModule],
      declarations: [
        TestXAnchorComponent,
        TestScrollXAnchorComponent,
        TestScrollFixedXAnchorComponent,
        TestUndefinedXAnchorComponent
      ]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXAnchorComponent>;
    let testComponent: TestXAnchorComponent;
    let debugElement: DebugElement;
    let element: Element;
    let shadowRoot: DocumentFragment;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXAnchorComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(
        By.directive(XAnchorComponent)
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
    let fixture: ComponentFixture<TestScrollXAnchorComponent>;
    let testComponent: TestScrollXAnchorComponent;
    let debugElement: DebugElement;
    let element: Element;
    let shadowRoot: DocumentFragment;
    let anchorComponent: XAnchorComponent;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestScrollXAnchorComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(
        By.directive(XAnchorComponent)
      );
      element = debugElement.nativeElement;
      shadowRoot = element.shadowRoot;
      anchorComponent = debugElement.componentInstance as XAnchorComponent;
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
      let activatedAnchor: XActivatedAnchor;
      (debugElement.componentInstance as XAnchorComponent).indexChange.subscribe(
        (x: XActivatedAnchor) => (activatedAnchor = x)
      );
      let liEle = fixture.debugElement.query(
        By.css(`ul li:nth-child(${index + 1})`)
      );
      liEle.triggerEventHandler("click", null);
      expect(activatedAnchor.activatedIndex).toBe(index);
    });
    it("should scroll change.", () => {
      anchorComponent.setActiveatedIndex();
      (anchorComponent.scrollElement as HTMLElement).scrollTop = 400;
      testComponent.doc.documentElement.scrollTop = 300;
      fixture.detectChanges();
      expect(element.classList).toContain(AnchorPrefix);
    });
  });
  describe(`event.`, () => {
    let fixture: ComponentFixture<TestXAnchorComponent>;
    let testComponent: TestXAnchorComponent;
    let debugElement: DebugElement;
    let element: Element;
    let shadowRoot: DocumentFragment;
    let anchorComponent: XAnchorComponent;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXAnchorComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(
        By.directive(XAnchorComponent)
      );
      element = debugElement.nativeElement;
      shadowRoot = element.shadowRoot;
      anchorComponent = debugElement.componentInstance as XAnchorComponent;
    });
    it("should activated anchor change.", () => {
      let index = 1;
      let activatedAnchor: XActivatedAnchor;
      anchorComponent.indexChange.subscribe(
        (x: XActivatedAnchor) => (activatedAnchor = x)
      );
      let liEle = fixture.debugElement.query(
        By.css(`ul li:nth-child(${index + 1})`)
      );
      liEle.triggerEventHandler("click", null);
      expect(activatedAnchor.activatedIndex).toBe(index);
    });
    it("should scroll change.", () => {
      let index = 1;
      let activatedAnchor: XActivatedAnchor;
      anchorComponent.indexChange.subscribe(
        (x: XActivatedAnchor) => (activatedAnchor = x)
      );
      let liEle = fixture.debugElement.query(
        By.css(`ul li:nth-child(${index + 1})`)
      );
      liEle.triggerEventHandler("click", null);
      expect(activatedAnchor.activatedIndex).toBe(index);
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
    let fixture: ComponentFixture<TestScrollFixedXAnchorComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestScrollFixedXAnchorComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(
        By.directive(XAnchorComponent)
      );
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`option undefined.`, () => {
    let fixture: ComponentFixture<TestUndefinedXAnchorComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestUndefinedXAnchorComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(
        By.directive(XAnchorComponent)
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
  selector: "test-x-anchor",
  template: `
    <x-anchor [layout]="layout" [top]="8" [sliderFixed]="true">
      ${htmlTemplate}
    </x-anchor>
  `
})
class TestXAnchorComponent {
  layout: XAnchorLayoutType;
  constructor(@Inject(DOCUMENT) public doc: any) {}
}

@Component({
  selector: "test-x-anchor",
  template: `
    <div class="scroll" #scroll style="height: 600px; overflow: auto">
      <div>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
        <p>This is a branch and a description.</p>
      </div>
      <x-anchor
        [scrollElement]="scroll"
        [layout]="layout"
        style="padding-bottom:300px;"
      >
        ${htmlTemplate}
      </x-anchor>
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
class TestScrollXAnchorComponent {
  layout: XAnchorLayoutType;
  constructor(@Inject(DOCUMENT) public doc: any) {}
}

@Component({
  selector: "test-scroll-fixed-x-anchor",
  template: `
    <div class="scroll-fixed">
      <div class="scroll" #scroll style="height: 600px; overflow: auto">
        <div>
          <p>This is a branch and a description.</p>
          <p>This is a branch and a description.</p>
          <p>This is a branch and a description.</p>
          <p>This is a branch and a description.</p>
        </div>
        <x-anchor
          [scrollElement]="scroll"
          [layout]="layout"
          style="padding-bottom:300px;"
        >
          ${htmlTemplate}
        </x-anchor>
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
class TestScrollFixedXAnchorComponent {
  layout: XAnchorLayoutType;
  constructor(@Inject(DOCUMENT) public doc: any) {}
}

@Component({
  selector: "test-undefined-x-anchor",
  template: `
    <x-anchor></x-anchor>
  `
})
class TestUndefinedXAnchorComponent {}
