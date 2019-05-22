import { Observable, Subject, BehaviorSubject } from "rxjs";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NmSliderComponent } from "./nm-slider.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NmSliderModule } from "./nm-slider.module";
import {
  SliderPrefix,
  NmSliderNode,
  NmSliderLayoutEnum,
  NmSliderBorderPositionEnum,
  NmActivatedSlider
} from "./nm-slider.type";
import { NmData } from "../../../interfaces/data.type";

describe(SliderPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NmSliderModule],
      declarations: [
        TestNmSliderComponent,
        TestEventNmSliderComponent,
        TestDataNmSliderComponent
      ]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestNmSliderComponent>;
    let testComponent: TestNmSliderComponent;
    let debugElement: DebugElement;
    let element: Element;
    let shadowRoot: DocumentFragment;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNmSliderComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(
        By.directive(NmSliderComponent)
      );
      element = debugElement.nativeElement;
      shadowRoot = element.shadowRoot;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
    it("should className.", () => {
      fixture.detectChanges();
      expect(element.classList).toContain(SliderPrefix);
    });
    it("should layout row.", () => {
      testComponent.layout = NmSliderLayoutEnum.Row;
      fixture.detectChanges();
      expect(element.classList).toContain(
        `${SliderPrefix}-${NmSliderLayoutEnum.Row}`
      );
    });
    it("should layout column.", () => {
      testComponent.layout = NmSliderLayoutEnum.Column;
      fixture.detectChanges();
      expect(element.classList).toContain(
        `${SliderPrefix}-${NmSliderLayoutEnum.Column}`
      );
    });
    it("should border position top.", () => {
      testComponent.layout = NmSliderLayoutEnum.Row;
      testComponent.position = NmSliderBorderPositionEnum.Top;
      fixture.detectChanges();
      expect(element.classList).toContain(
        `${SliderPrefix}-border-position-${NmSliderBorderPositionEnum.Top}`
      );
    });
    it("should border position right.", () => {
      testComponent.layout = NmSliderLayoutEnum.Column;
      testComponent.position = NmSliderBorderPositionEnum.Right;
      fixture.detectChanges();
      expect(element.classList).toContain(
        `${SliderPrefix}-border-position-${NmSliderBorderPositionEnum.Right}`
      );
    });
    it("should border position bottom.", () => {
      testComponent.layout = NmSliderLayoutEnum.Row;
      testComponent.position = NmSliderBorderPositionEnum.Bottom;
      fixture.detectChanges();
      expect(element.classList).toContain(
        `${SliderPrefix}-border-position-${NmSliderBorderPositionEnum.Bottom}`
      );
    });
    it("should border position left.", () => {
      testComponent.layout = NmSliderLayoutEnum.Column;
      testComponent.position = NmSliderBorderPositionEnum.Left;
      fixture.detectChanges();
      expect(element.classList).toContain(
        `${SliderPrefix}-border-position-${NmSliderBorderPositionEnum.Left}`
      );
    });
  });
  describe(`event.`, () => {
    let fixture: ComponentFixture<TestEventNmSliderComponent>;
    let testComponent: TestEventNmSliderComponent;
    let debugElement: DebugElement;
    let element: Element;
    let shadowRoot: DocumentFragment;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestEventNmSliderComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(
        By.directive(NmSliderComponent)
      );
      element = debugElement.nativeElement;
      shadowRoot = element.shadowRoot;
    });
    it("should activated slider change.", () => {
      let index = 1;
      let indexSlider: NmActivatedSlider = {
        nmActivatedIndex: index,
        nmActivatedSlider: testComponent.data[index]
      };
      let activatedSilder: NmActivatedSlider;
      (debugElement.componentInstance as NmSliderComponent).nmActivatedChange.subscribe(
        (x: NmActivatedSlider) => (activatedSilder = x)
      );
      let liEle = fixture.debugElement.query(
        By.css(`ul li:nth-child(${index + 1})`)
      );
      liEle.triggerEventHandler("click", null);
      expect(activatedSilder).toEqual(indexSlider);
    });
  });
  describe(`data.`, () => {
    let fixture: ComponentFixture<TestDataNmSliderComponent>;
    let testComponent: TestDataNmSliderComponent;
    let debugElement: DebugElement;
    let element: Element;
    let shadowRoot: DocumentFragment;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestDataNmSliderComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(
        By.directive(NmSliderComponent)
      );
      element = debugElement.nativeElement;
      shadowRoot = element.shadowRoot;
    });
    it("should data type is BehaviorSubject.", () => {
      if (testComponent.data instanceof BehaviorSubject) {
        testComponent.data.next(testNmSliderNode);
        testComponent.data.complete();
        expect(
          (debugElement.componentInstance as NmSliderComponent).data
        ).toEqual(testNmSliderNode);
      }
    });
  });
});

const testNmSliderNode: NmSliderNode[] = [
  { nmKey: 1, nmLabel: "Home" },
  { nmKey: 2, nmLabel: "Docs" },
  { nmKey: 3, nmLabel: "Examples" },
  { nmKey: 4, nmLabel: "Api" }
];

@Component({
  selector: "test-nm-slider",
  template: `
    <nm-slider
      [nmData]="data"
      [nmLayout]="layout"
      [nmBorderPosition]="position"
    ></nm-slider>
  `
})
class TestNmSliderComponent {
  data: NmData<NmSliderNode[]> = testNmSliderNode;
  layout: NmSliderLayoutEnum;
  position: NmSliderBorderPositionEnum;
}

@Component({
  selector: "test-event-nm-slider",
  template: `
    <nm-slider
      [nmData]="data"
      (nmActivatedChange)="activatedChange($event)"
    ></nm-slider>
  `
})
class TestEventNmSliderComponent {
  data: NmData<NmSliderNode[]> = testNmSliderNode;
  activatedChange($event: any) {}
}

@Component({
  selector: "test-data-nm-slider",
  template: `
    <nm-slider [nmData]="data"></nm-slider>
  `
})
class TestDataNmSliderComponent {
  data: NmData<NmSliderNode[]> = new BehaviorSubject([]);
}
