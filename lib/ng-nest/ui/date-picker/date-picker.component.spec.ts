import { interval } from "rxjs";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { XDatePickerComponent } from "./date-picker.component";
import { Component, DebugElement, ChangeDetectorRef } from "@angular/core";
import { By } from "@angular/platform-browser";
import { XDatePickerModule } from "./date-picker.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { XDatePickerPrefix, XDatePickerNode } from "./date-picker.type";
import { XFenceModule } from "@ng-nest/ui/fence";

describe(XDatePickerPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XDatePickerModule, FormsModule, ReactiveFormsModule, XFenceModule],
      declarations: [
        TestXDatePickerComponent,
        TestXDatePickerLabelComponent,
        TestXDatePickerDisabledComponent,
        TestXDatePickerRequiredComponent
      ]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXDatePickerComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXDatePickerComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XDatePickerComponent));
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`label.`, () => {
    let fixture: ComponentFixture<TestXDatePickerLabelComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXDatePickerLabelComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXDatePickerLabelComponent));
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`disabled.`, () => {
    let fixture: ComponentFixture<TestXDatePickerDisabledComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXDatePickerDisabledComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXDatePickerDisabledComponent));
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`required.`, () => {
    let fixture: ComponentFixture<TestXDatePickerRequiredComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXDatePickerRequiredComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXDatePickerRequiredComponent));
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  template: `
    <x-row>
      <x-col span="8">
        <x-date-picker [(ngModel)]="model1"></x-date-picker>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="8">
        <x-date-picker [(ngModel)]="model2"></x-date-picker>
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
class TestXDatePickerComponent {
  model1: any;
  model2 = new Date();
  constructor(private cdr: ChangeDetectorRef) {
    interval(0).subscribe(x => {
      this.cdr.detectChanges();
    });
  }
}

@Component({
  template: `
    <x-row>
      <x-col span="12">
        <x-date-picker label="方式" [(ngModel)]="model"></x-date-picker>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-date-picker label="方式" [(ngModel)]="model" direction="column-reverse"></x-date-picker>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-date-picker label="方式" [(ngModel)]="model" direction="row"></x-date-picker>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-date-picker label="方式" [(ngModel)]="model" direction="row-reverse"></x-date-picker>
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
class TestXDatePickerLabelComponent {
  model: any;
  constructor(private cdr: ChangeDetectorRef) {
    interval(50).subscribe(x => {
      this.cdr.detectChanges();
    });
  }
}

@Component({
  template: `
    <x-row>
      <x-col span="12">
        <x-date-picker disabled></x-date-picker>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-date-picker [(ngModel)]="model" disabled></x-date-picker>
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
class TestXDatePickerDisabledComponent {
  model = new Date();
}

@Component({
  template: `
    <x-row>
      <x-col span="12">
        <x-date-picker [(ngModel)]="model" required></x-date-picker>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-date-picker [(ngModel)]="model" label="选择" required></x-date-picker>
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
class TestXDatePickerRequiredComponent {
  model: any;
  constructor(private cdr: ChangeDetectorRef) {
    interval(50).subscribe(x => {
      this.cdr.detectChanges();
    });
  }
}
