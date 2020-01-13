import { interval } from "rxjs";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { XColorPickerComponent } from "./color-picker.component";
import { Component, DebugElement, ChangeDetectorRef } from "@angular/core";
import { By } from "@angular/platform-browser";
import { XColorPickerModule } from "./color-picker.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { XColorPickerPrefix, XColorPickerNode } from "./color-picker.type";
import { XFenceModule } from "@ng-nest/ui/fence";

describe(XColorPickerPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XColorPickerModule, FormsModule, ReactiveFormsModule, XFenceModule],
      declarations: [
        TestXColorPickerComponent,
        TestXColorPickerLabelComponent,
        TestXColorPickerDisabledComponent,
        TestXColorPickerRequiredComponent
      ]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXColorPickerComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXColorPickerComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XColorPickerComponent));
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`label.`, () => {
    let fixture: ComponentFixture<TestXColorPickerLabelComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXColorPickerLabelComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXColorPickerLabelComponent));
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`disabled.`, () => {
    let fixture: ComponentFixture<TestXColorPickerDisabledComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXColorPickerDisabledComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXColorPickerDisabledComponent));
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`required.`, () => {
    let fixture: ComponentFixture<TestXColorPickerRequiredComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXColorPickerRequiredComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXColorPickerRequiredComponent));
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
});

const data: XColorPickerNode[] = [];

@Component({
  template: `
    <x-row>
      <x-col span="12">
        <x-color-picker [(ngModel)]="model1"></x-color-picker>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-color-picker [(ngModel)]="model2"></x-color-picker>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      :host {
        height: 900px;
      }
      x-row:not(:first-child) {
        margin-top: 0.5rem;
      }
      x-row x-col {
        width: 10rem;
      }
    `
  ]
})
class TestXColorPickerComponent {
  model1: any;
  model2 = "#";
  constructor(private cdr: ChangeDetectorRef) {
    interval(1).subscribe(x => {
      this.cdr.detectChanges();
    });
  }
}

@Component({
  template: `
    <x-row>
      <x-col span="12">
        <x-color-picker label="方式" [(ngModel)]="model"></x-color-picker>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-color-picker label="方式" [(ngModel)]="model" direction="column-reverse"></x-color-picker>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-color-picker label="方式" [(ngModel)]="model" direction="row"></x-color-picker>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-color-picker label="方式" [(ngModel)]="model" direction="row-reverse"></x-color-picker>
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
class TestXColorPickerLabelComponent {
  data = data;
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
        <x-color-picker isabled></x-color-picker>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-color-picker [(ngModel)]="model" disabled></x-color-picker>
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
class TestXColorPickerDisabledComponent {
  data = data;
  model = 22;
}

@Component({
  template: `
    <x-row>
      <x-col span="12">
        <x-color-picker [(ngModel)]="model1" required></x-color-picker>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-color-picker [(ngModel)]="model2" label="选择" required></x-color-picker>
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
class TestXColorPickerRequiredComponent {
  data = data;
  model1: any;
  model2: any;
  constructor(private cdr: ChangeDetectorRef) {
    interval(50).subscribe(x => {
      this.cdr.detectChanges();
    });
  }
}
