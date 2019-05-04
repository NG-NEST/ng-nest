import { Observable, Subject, BehaviorSubject } from "rxjs";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NmSliderComponent } from "./nm-slider.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { NmSliderModule } from "./nm-slider.module";
import { SliderPrefix, NmSliderData } from "./nm-slider.type";
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
    it("should data type is Array.", () => {
      testComponent.data = [];
      fixture.detectChanges();
      expect(element.classList).toContain(SliderPrefix);
    });
    it("should data type is Subject.", () => {
      testComponent.data = new Subject<NmSliderData[]>();
      fixture.detectChanges();
      expect(element.classList).toContain(SliderPrefix);
    });
    it("should data type is BehaviorSubject.", () => {
      testComponent.data = new BehaviorSubject<NmSliderData[]>([]);
      fixture.detectChanges();
      expect(element.classList).toContain(SliderPrefix);
    });
    it("should data type is Observable.", () => {
      testComponent.data = new Observable<NmSliderData[]>();
      fixture.detectChanges();
      expect(element.classList).toContain(SliderPrefix);
    });
  });
});

@Component({
  selector: "test-nm-slider",
  template: `
    <nm-slider [nmData]="data"></nm-slider>
  `
})
class TestNmSliderComponent {
  data: NmData<NmSliderData[]>;
}
