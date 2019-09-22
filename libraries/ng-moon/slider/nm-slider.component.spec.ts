import { BehaviorSubject } from "rxjs";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NmSliderComponent } from "./nm-slider.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NmSliderModule } from "./nm-slider.module";
import {
  SliderPrefix,
  NmSliderNode,
  NmSliderLayoutType,
  NmSliderBorderPositionType,
  NmActivatedSlider
} from "./nm-slider.type";
import { NmData } from "ng-moon/core";

describe(SliderPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NmSliderModule],
      declarations: [
        TestNmSliderComponent,
        TestEventNmSliderComponent,
        TestDataNmSliderComponent,
        TestDataUndefinedNmSliderComponent
      ]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestNmSliderComponent>;
    let testComponent: TestNmSliderComponent;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNmSliderComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(
        By.directive(NmSliderComponent)
      );
      element = debugElement.nativeElement;
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
    it("should className.", () => {
      fixture.detectChanges();
      expect(element.classList).toContain(SliderPrefix);
    });
    it("should layout row.", () => {
      testComponent.layout = "row";
      fixture.detectChanges();
      expect(element.classList).toContain(`${SliderPrefix}-row`);
    });
    it("should layout column.", () => {
      testComponent.layout = "column";
      fixture.detectChanges();
      expect(element.classList).toContain(`${SliderPrefix}-column`);
    });
    it("should border position top.", () => {
      testComponent.layout = "row";
      testComponent.position = "top";
      fixture.detectChanges();
      expect(element.classList).toContain(
        `${SliderPrefix}-border-position-top`
      );
    });
    it("should border position right.", () => {
      testComponent.layout = "column";
      testComponent.position = "right";
      fixture.detectChanges();
      expect(element.classList).toContain(
        `${SliderPrefix}-border-position-right`
      );
    });
    it("should border position bottom.", () => {
      testComponent.layout = "row";
      testComponent.position = "bottom";
      fixture.detectChanges();
      expect(element.classList).toContain(
        `${SliderPrefix}-border-position-bottom`
      );
    });
    it("should border position left.", () => {
      testComponent.layout = "column";
      testComponent.position = "left";
      fixture.detectChanges();
      expect(element.classList).toContain(
        `${SliderPrefix}-border-position-left`
      );
    });
    it("should layout row. border position left.", () => {
      testComponent.layout = "row";
      testComponent.position = "left";
      fixture.detectChanges();
      expect(element.classList).toContain(
        `${SliderPrefix}-border-position-bottom`
      );
    });
    it("should layout column. border position top.", () => {
      testComponent.layout = "column";
      testComponent.position = "top";
      fixture.detectChanges();
      expect(element.classList).toContain(
        `${SliderPrefix}-border-position-left`
      );
    });
  });
  describe(`event.`, () => {
    let fixture: ComponentFixture<TestEventNmSliderComponent>;
    let testComponent: TestEventNmSliderComponent;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestEventNmSliderComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(
        By.directive(NmSliderComponent)
      );
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
    beforeEach(() => {
      fixture = TestBed.createComponent(TestDataNmSliderComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(
        By.directive(NmSliderComponent)
      );
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
  describe(`data undefined.`, () => {
    let fixture: ComponentFixture<TestDataUndefinedNmSliderComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestDataUndefinedNmSliderComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(
        By.directive(NmSliderComponent)
      );
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
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
  layout: NmSliderLayoutType;
  position: NmSliderBorderPositionType;
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
  activatedChange() {}
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

@Component({
  selector: "test-data-undefined-nm-slider",
  template: `
    <nm-slider [nmData]="data"></nm-slider>
  `
})
class TestDataUndefinedNmSliderComponent {
  data: NmData<NmSliderNode[]>;
}
