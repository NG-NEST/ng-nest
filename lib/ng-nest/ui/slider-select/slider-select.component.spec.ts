import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { XSliderSelectComponent } from "./slider-select.component";
import { Component, DebugElement, ChangeDetectorRef } from "@angular/core";
import { By } from "@angular/platform-browser";
import { XSliderSelectModule } from "./slider-select.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { XSliderSelectPrefix } from "./slider-select.type";
import { XFenceModule } from "@ng-nest/ui/fence";
import { interval } from "rxjs";

describe(XSliderSelectPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XSliderSelectModule, FormsModule, ReactiveFormsModule, XFenceModule],
      declarations: [
        TestXSliderSelectComponent,
        TestXSliderSelectLabelComponent,
        TestXSliderSelectLimitComponent,
        TestXSliderSelectPrecisionComponent,
        TestXSliderSelectDisabledComponent
      ]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXSliderSelectComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXSliderSelectComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XSliderSelectComponent));
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`label.`, () => {
    let fixture: ComponentFixture<TestXSliderSelectLabelComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXSliderSelectLabelComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXSliderSelectLabelComponent));
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`limit.`, () => {
    let fixture: ComponentFixture<TestXSliderSelectLimitComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXSliderSelectLimitComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXSliderSelectLimitComponent));
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`precision.`, () => {
    let fixture: ComponentFixture<TestXSliderSelectPrecisionComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXSliderSelectPrecisionComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXSliderSelectPrecisionComponent));
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`disabled.`, () => {
    let fixture: ComponentFixture<TestXSliderSelectDisabledComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXSliderSelectDisabledComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXSliderSelectDisabledComponent));
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
        <x-slider-select></x-slider-select>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-slider-select [(ngModel)]="model"></x-slider-select>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      x-row:not(:first-child) {
        margin-top: 0.5rem;
      }
    `
  ]
})
class TestXSliderSelectComponent {
  model = 60;
  constructor(public cdr: ChangeDetectorRef) {
    interval(1).subscribe(x => {
      this.cdr.detectChanges();
    });
  }
}

@Component({
  template: `
    <x-row>
      <x-col span="12">
        <x-slider-select max="10" [(ngModel)]="model1"></x-slider-select>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-slider-select min="-10" [(ngModel)]="model2"></x-slider-select>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-slider-select min="-10" max="10" [(ngModel)]="model3"></x-slider-select>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      x-row:not(:first-child) {
        margin-top: 0.5rem;
      }
    `
  ]
})
class TestXSliderSelectLimitComponent {
  model1 = 0;
  model2 = 0;
  model3 = 0;
  constructor(public cdr: ChangeDetectorRef) {
    interval(1).subscribe(x => {
      this.cdr.detectChanges();
    });
  }
}

@Component({
  template: `
    <x-row>
      <x-col span="12">
        <x-slider-select min="0" max="1" step="0.1"></x-slider-select>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-slider-select min="0" max="1" step="0.01"></x-slider-select>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      x-row:not(:first-child) {
        margin-top: 0.5rem;
      }
    `
  ]
})
class TestXSliderSelectPrecisionComponent {
  constructor(public cdr: ChangeDetectorRef) {
    interval(1).subscribe(x => {
      this.cdr.detectChanges();
    });
  }
}

@Component({
  template: `
    <x-row>
      <x-col span="12">
        <x-slider-select label="数量" [(ngModel)]="model"></x-slider-select>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-slider-select label="数量" [(ngModel)]="model" direction="column-reverse"></x-slider-select>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-slider-select label="数量" [(ngModel)]="model" direction="row"></x-slider-select>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-slider-select label="数量" [(ngModel)]="model" direction="row-reverse"></x-slider-select>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      x-row:not(:first-child) {
        margin-top: 0.5rem;
      }
    `
  ]
})
class TestXSliderSelectLabelComponent {
  model: number = 0;
  constructor(public cdr: ChangeDetectorRef) {
    interval(1).subscribe(x => {
      this.cdr.detectChanges();
    });
  }
}

@Component({
  template: `
    <x-row>
      <x-col span="12">
        <x-slider-select disabled></x-slider-select>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-slider-select disabled [(ngModel)]="model"></x-slider-select>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      x-row:not(:first-child) {
        margin-top: 0.5rem;
      }
    `
  ]
})
class TestXSliderSelectDisabledComponent {
  model = 60;
}
