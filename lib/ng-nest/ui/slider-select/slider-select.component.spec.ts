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
        TestXSliderSelectDisabledComponent,
        TestXSliderSelectRequiredComponent
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
  describe(`required.`, () => {
    let fixture: ComponentFixture<TestXSliderSelectRequiredComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXSliderSelectRequiredComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXSliderSelectRequiredComponent));
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
  `,
  styles: [
    `
      x-row {
        margin-top: 1rem;
      }
      x-row > x-col {
        margin: 2rem;
      }
    `
  ]
})
class TestXSliderSelectComponent {
  constructor(public cdr: ChangeDetectorRef) {
    interval(10).subscribe(x => {
      this.cdr.detectChanges();
    });
  }
}

@Component({
  template: `
    <x-row>
      <x-col>
        <x-slider-select label="数量"></x-slider-select>
      </x-col>
    </x-row>
    <x-row>
      <x-col>
        <x-slider-select label="数量" direction="column-reverse"></x-slider-select>
      </x-col>
    </x-row>
    <x-row>
      <x-col>
        <x-slider-select label="数量" direction="row"></x-slider-select>
      </x-col>
    </x-row>
    <x-row>
      <x-col>
        <x-slider-select label="数量" direction="row-reverse"></x-slider-select>
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
class TestXSliderSelectLabelComponent {}

@Component({
  template: `
    <x-row>
      <x-col>
        <x-slider-select max="10"></x-slider-select>
      </x-col>
    </x-row>
    <x-row>
      <x-col>
        <x-slider-select min="1"></x-slider-select>
      </x-col>
    </x-row>
    <x-row>
      <x-col>
        <x-slider-select min="1" max="10"></x-slider-select>
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
class TestXSliderSelectLimitComponent {}

@Component({
  template: `
    <x-row>
      <x-col>
        <x-slider-select precision="2" step="0.1"></x-slider-select>
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
class TestXSliderSelectPrecisionComponent {}

@Component({
  template: `
    <x-row>
      <x-col>
        <x-slider-select disabled></x-slider-select>
      </x-col>
      <x-col>
        <x-slider-select disabled [(ngModel)]="model"></x-slider-select>
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
class TestXSliderSelectDisabledComponent {
  model = 10;
}

@Component({
  template: `
    <x-row>
      <x-col>
        <x-slider-select required></x-slider-select>
      </x-col>
      <x-col>
        <x-slider-select label="数量" required></x-slider-select>
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
class TestXSliderSelectRequiredComponent {}
