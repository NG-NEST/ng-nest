import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { XInputSliderComponent } from "./input-slider.component";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { XInputSliderModule } from "./input-slider.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { XInputSliderPrefix } from "./input-slider.type";
import { XFenceModule } from "@ng-nest/ui/fence";

describe(XInputSliderPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XInputSliderModule, FormsModule, ReactiveFormsModule, XFenceModule],
      declarations: [
        TestXInputSliderComponent,
        TestXInputSliderLabelComponent,
        TestXInputSliderLimitComponent,
        TestXInputSliderPrecisionComponent,
        TestXInputSliderDisabledComponent,
        TestXInputSliderRequiredComponent
      ]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXInputSliderComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXInputSliderComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XInputSliderComponent));
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`label.`, () => {
    let fixture: ComponentFixture<TestXInputSliderLabelComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXInputSliderLabelComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXInputSliderLabelComponent));
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`limit.`, () => {
    let fixture: ComponentFixture<TestXInputSliderLimitComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXInputSliderLimitComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXInputSliderLimitComponent));
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`precision.`, () => {
    let fixture: ComponentFixture<TestXInputSliderPrecisionComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXInputSliderPrecisionComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXInputSliderPrecisionComponent));
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`disabled.`, () => {
    let fixture: ComponentFixture<TestXInputSliderDisabledComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXInputSliderDisabledComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXInputSliderDisabledComponent));
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`required.`, () => {
    let fixture: ComponentFixture<TestXInputSliderRequiredComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXInputSliderRequiredComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXInputSliderRequiredComponent));
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  template: `
    <x-row>
      <x-col span="12">
        <x-input-slider></x-input-slider>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      x-row {
        margin-top: 1rem;
      }
      x-row > x-col {
      }
    `
  ]
})
class TestXInputSliderComponent {}

@Component({
  template: `
    <x-row>
      <x-col>
        <x-input-slider label="数量"></x-input-slider>
      </x-col>
    </x-row>
    <x-row>
      <x-col>
        <x-input-slider label="数量" direction="column-reverse"></x-input-slider>
      </x-col>
    </x-row>
    <x-row>
      <x-col>
        <x-input-slider label="数量" direction="row"></x-input-slider>
      </x-col>
    </x-row>
    <x-row>
      <x-col>
        <x-input-slider label="数量" direction="row-reverse"></x-input-slider>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      x-row > x-col {
        width: 10rem;
      }
      x-row:not(:first-child) {
        margin-top: 0.5rem;
      }
    `
  ]
})
class TestXInputSliderLabelComponent {}

@Component({
  template: `
    <x-row>
      <x-col>
        <x-input-slider max="10"></x-input-slider>
      </x-col>
    </x-row>
    <x-row>
      <x-col>
        <x-input-slider min="1"></x-input-slider>
      </x-col>
    </x-row>
    <x-row>
      <x-col>
        <x-input-slider min="1" max="10"></x-input-slider>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      x-row > x-col {
        width: 10rem;
      }
      x-row:not(:first-child) {
        margin-top: 0.5rem;
      }
    `
  ]
})
class TestXInputSliderLimitComponent {}

@Component({
  template: `
    <x-row>
      <x-col>
        <x-input-slider precision="2" step="0.1"></x-input-slider>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      x-row > x-col {
        width: 10rem;
      }
      x-row:not(:first-child) {
        margin-top: 0.5rem;
      }
    `
  ]
})
class TestXInputSliderPrecisionComponent {}

@Component({
  template: `
    <x-row>
      <x-col>
        <x-input-slider disabled></x-input-slider>
      </x-col>
      <x-col>
        <x-input-slider disabled [(ngModel)]="model"></x-input-slider>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      x-row > x-col {
        width: 10rem;
      }
      x-row > x-col:not(:first-child) {
        margin-top: 0.5rem;
      }
    `
  ]
})
class TestXInputSliderDisabledComponent {
  model = 10;
}

@Component({
  template: `
    <x-row>
      <x-col>
        <x-input-slider required></x-input-slider>
      </x-col>
      <x-col>
        <x-input-slider label="数量" required></x-input-slider>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      x-row > x-col {
        width: 10rem;
      }
      x-row > x-col:not(:first-child) {
        margin-top: 0.5rem;
      }
    `
  ]
})
class TestXInputSliderRequiredComponent {}
