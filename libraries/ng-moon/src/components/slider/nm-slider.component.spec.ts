import { Observable, Subject, BehaviorSubject } from "rxjs";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NmSliderComponent } from "./nm-slider.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NmSliderModule } from "./nm-slider.module";
import {
  SliderPrefix,
  NmSliderData,
  NmSliderLayoutEnum,
  NmSliderBorderPositionEnum
} from "./nm-slider.type";
import { NmData } from "../../interfaces/data.type";

describe(SliderPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NmSliderModule],
      declarations: [TestNmSliderComponent]
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
    // it("should data type is Subject.", () => {
    //   testComponent.data = new Subject<NmSliderData[]>();
    //   fixture.detectChanges();
    //   expect(element.classList).toContain(SliderPrefix);
    // });
    // it("should data type is BehaviorSubject.", () => {
    //   testComponent.data = new BehaviorSubject<NmSliderData[]>([]);
    //   fixture.detectChanges();
    //   expect(element.classList).toContain(SliderPrefix);
    // });
    // it("should data type is Observable.", () => {
    //   testComponent.data = new Observable<NmSliderData[]>();
    //   fixture.detectChanges();
    //   expect(element.classList).toContain(SliderPrefix);
    // });
  });
});

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
  data: NmData<NmSliderData[]> = [
    { nmKey: 1, nmLabel: "Home" },
    { nmKey: 2, nmLabel: "Docs" },
    { nmKey: 3, nmLabel: "Examples" },
    { nmKey: 4, nmLabel: "Api" }
  ];
  layout: NmSliderLayoutEnum;
  position: NmSliderBorderPositionEnum;
}
