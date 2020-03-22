import { BehaviorSubject } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XSliderComponent } from './slider.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XSliderModule } from './slider.module';
import {
  SliderPrefix,
  XSliderNode,
  XSliderLayoutType,
  XSliderBorderPositionType,
  XActivatedSlider
} from './slider.type';
import { XData } from '@ng-nest/ui/core';

describe(SliderPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XSliderModule],
      declarations: [
        TestXSliderComponent,
        TestEventXSliderComponent,
        TestDataXSliderComponent,
        TestDataUndefinedXSliderComponent
      ]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXSliderComponent>;
    let testComponent: TestXSliderComponent;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXSliderComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XSliderComponent));
      element = debugElement.nativeElement;
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
    it('should className.', () => {
      fixture.detectChanges();
      expect(element.classList).toContain(SliderPrefix);
    });
    it('should layout row.', () => {
      testComponent.layout = 'row';
      fixture.detectChanges();
      expect(element.classList).toContain(`${SliderPrefix}-row`);
    });
    it('should layout column.', () => {
      testComponent.layout = 'column';
      fixture.detectChanges();
      expect(element.classList).toContain(`${SliderPrefix}-column`);
    });
    it('should border position top.', () => {
      testComponent.layout = 'row';
      testComponent.position = 'top';
      fixture.detectChanges();
      expect(element.classList).toContain(`${SliderPrefix}-border-position-top`);
    });
    it('should border position right.', () => {
      testComponent.layout = 'column';
      testComponent.position = 'right';
      fixture.detectChanges();
      expect(element.classList).toContain(`${SliderPrefix}-border-position-right`);
    });
    it('should border position bottom.', () => {
      testComponent.layout = 'row';
      testComponent.position = 'bottom';
      fixture.detectChanges();
      expect(element.classList).toContain(`${SliderPrefix}-border-position-bottom`);
    });
    it('should border position left.', () => {
      testComponent.layout = 'column';
      testComponent.position = 'left';
      fixture.detectChanges();
      expect(element.classList).toContain(`${SliderPrefix}-border-position-left`);
    });
    it('should layout row. border position left.', () => {
      testComponent.layout = 'row';
      testComponent.position = 'left';
      fixture.detectChanges();
      expect(element.classList).toContain(`${SliderPrefix}-border-position-bottom`);
    });
    it('should layout column. border position top.', () => {
      testComponent.layout = 'column';
      testComponent.position = 'top';
      fixture.detectChanges();
      expect(element.classList).toContain(`${SliderPrefix}-border-position-left`);
    });
  });
  describe(`event.`, () => {
    let fixture: ComponentFixture<TestEventXSliderComponent>;
    let testComponent: TestEventXSliderComponent;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestEventXSliderComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XSliderComponent));
    });
    it('should activated slider change.', () => {
      let index = 1;
      let indexSlider: XActivatedSlider = {
        activatedIndex: index,
        activatedSlider: testComponent.data[index]
      };
      let activatedSilder: XActivatedSlider;
      (debugElement.componentInstance as XSliderComponent).indexChange.subscribe(
        (x: XActivatedSlider) => (activatedSilder = x)
      );
      let liEle = fixture.debugElement.query(By.css(`ul li:nth-child(${index + 1})`));
      liEle.triggerEventHandler('click', null);
      expect(activatedSilder).toEqual(indexSlider);
    });
  });
  describe(`data.`, () => {
    let fixture: ComponentFixture<TestDataXSliderComponent>;
    let testComponent: TestDataXSliderComponent;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestDataXSliderComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XSliderComponent));
    });
    it('should data type is BehaviorSubject.', () => {
      if (testComponent.data instanceof BehaviorSubject) {
        testComponent.data.next(testXSliderNode);
        testComponent.data.complete();
        expect((debugElement.componentInstance as XSliderComponent).sliderNodes).toEqual(testXSliderNode);
      }
    });
  });
  describe(`data undefined.`, () => {
    let fixture: ComponentFixture<TestDataUndefinedXSliderComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestDataUndefinedXSliderComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XSliderComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
});

const testXSliderNode: XSliderNode[] = [
  { id: 1, label: 'Home' },
  { id: 2, label: 'Docs' },
  { id: 3, label: 'Examples' },
  { id: 4, label: 'Api' }
];

@Component({
  selector: 'test-x-slider',
  template: `
    <x-slider [data]="data" [layout]="layout" [borderPosition]="position"></x-slider>
  `
})
class TestXSliderComponent {
  data: XData<XSliderNode[]> = testXSliderNode;
  layout: XSliderLayoutType;
  position: XSliderBorderPositionType;
}

@Component({
  selector: 'test-event-x-slider',
  template: `
    <x-slider [data]="data" (indexChange)="activatedChange($event)"></x-slider>
  `
})
class TestEventXSliderComponent {
  data: XData<XSliderNode[]> = testXSliderNode;
  activatedChange() {}
}

@Component({
  selector: 'test-data-x-slider',
  template: `
    <x-slider [data]="data"></x-slider>
  `
})
class TestDataXSliderComponent {
  data: XData<XSliderNode[]> = new BehaviorSubject([]);
}

@Component({
  selector: 'test-data-undefined-x-slider',
  template: `
    <x-slider [data]="data"></x-slider>
  `
})
class TestDataUndefinedXSliderComponent {
  data: XData<XSliderNode[]>;
}
