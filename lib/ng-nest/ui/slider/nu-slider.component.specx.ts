import { BehaviorSubject } from "rxjs";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NuSliderComponent } from "./nu-slider.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NuSliderModule } from "./nu-slider.module";
import {
  SliderPrefix,
  NuSliderNode,
  NuSliderLayoutType,
  NuSliderBorderPositionType,
  NuActivatedSlider
} from "./nu-slider.type";
import { NuData } from "@ng-nest/ui/core";

describe(SliderPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NuSliderModule],
      declarations: [
        TestNuSliderComponent,
        TestEventNuSliderComponent,
        TestDataNuSliderComponent,
        TestDataUndefinedNuSliderComponent
      ]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestNuSliderComponent>;
    let testComponent: TestNuSliderComponent;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestNuSliderComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(
        By.directive(NuSliderComponent)
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
    let fixture: ComponentFixture<TestEventNuSliderComponent>;
    let testComponent: TestEventNuSliderComponent;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestEventNuSliderComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(
        By.directive(NuSliderComponent)
      );
    });
    it("should activated slider change.", () => {
      let index = 1;
      let indexSlider: NuActivatedSlider = {
        nuActivatedIndex: index,
        nuActivatedSlider: testComponent.data[index]
      };
      let activatedSilder: NuActivatedSlider;
      (debugElement.componentInstance as NuSliderComponent).nuActivatedChange.subscribe(
        (x: NuActivatedSlider) => (activatedSilder = x)
      );
      let liEle = fixture.debugElement.query(
        By.css(`ul li:nth-child(${index + 1})`)
      );
      liEle.triggerEventHandler("click", null);
      expect(activatedSilder).toEqual(indexSlider);
    });
  });
  describe(`data.`, () => {
    let fixture: ComponentFixture<TestDataNuSliderComponent>;
    let testComponent: TestDataNuSliderComponent;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestDataNuSliderComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(
        By.directive(NuSliderComponent)
      );
    });
    it("should data type is BehaviorSubject.", () => {
      if (testComponent.data instanceof BehaviorSubject) {
        testComponent.data.next(testNuSliderNode);
        testComponent.data.complete();
        expect(
          (debugElement.componentInstance as NuSliderComponent).data
        ).toEqual(testNuSliderNode);
      }
    });
  });
  describe(`data undefined.`, () => {
    let fixture: ComponentFixture<TestDataUndefinedNuSliderComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestDataUndefinedNuSliderComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(
        By.directive(NuSliderComponent)
      );
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
});

const testNuSliderNode: NuSliderNode[] = [
  { nuKey: 1, nuLabel: "Home" },
  { nuKey: 2, nuLabel: "Docs" },
  { nuKey: 3, nuLabel: "Examples" },
  { nuKey: 4, nuLabel: "Api" }
];

@Component({
  selector: "test-nu-slider",
  template: `
    <nu-slider
      [nuData]="data"
      [nuLayout]="layout"
      [nuBorderPosition]="position"
    ></nu-slider>
  `
})
class TestNuSliderComponent {
  data: NuData<NuSliderNode[]> = testNuSliderNode;
  layout: NuSliderLayoutType;
  position: NuSliderBorderPositionType;
}

@Component({
  selector: "test-event-nu-slider",
  template: `
    <nu-slider
      [nuData]="data"
      (nuActivatedChange)="activatedChange($event)"
    ></nu-slider>
  `
})
class TestEventNuSliderComponent {
  data: NuData<NuSliderNode[]> = testNuSliderNode;
  activatedChange() {}
}

@Component({
  selector: "test-data-nu-slider",
  template: `
    <nu-slider [nuData]="data"></nu-slider>
  `
})
class TestDataNuSliderComponent {
  data: NuData<NuSliderNode[]> = new BehaviorSubject([]);
}

@Component({
  selector: "test-data-undefined-nu-slider",
  template: `
    <nu-slider [nuData]="data"></nu-slider>
  `
})
class TestDataUndefinedNuSliderComponent {
  data: NuData<NuSliderNode[]>;
}
