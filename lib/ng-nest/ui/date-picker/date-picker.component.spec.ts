import { interval } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XDatePickerComponent } from './date-picker.component';
import { Component, DebugElement, ChangeDetectorRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XDatePickerModule } from '@ng-nest/ui/date-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XDatePickerPrefix } from './date-picker.property';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XThemeModule } from '@ng-nest/ui/theme';

describe(XDatePickerPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, XThemeModule, XDatePickerModule, FormsModule, ReactiveFormsModule, XLayoutModule],
      declarations: [
        TestXDatePickerComponent,
        TestXDatePickerLabelComponent,
        TestXDatePickerDisabledComponent,
        TestXDatePickerRequiredComponent,
        TestXDatePickerYearOrMonthComponent
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
    it('should create.', () => {
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
    it('should create.', () => {
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
    it('should create.', () => {
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
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`year or month.`, () => {
    let fixture: ComponentFixture<TestXDatePickerYearOrMonthComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXDatePickerYearOrMonthComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXDatePickerYearOrMonthComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  template: `
    <x-theme showDark></x-theme>
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
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      x-row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXDatePickerComponent {
  model1: any;
  model2 = new Date();
  constructor(private cdr: ChangeDetectorRef) {
    interval(0).subscribe((x) => {
      this.cdr.detectChanges();
    });
  }
}

@Component({
  template: `
    <x-theme showDark></x-theme>
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
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      x-row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXDatePickerLabelComponent {
  model: any;
  constructor(private cdr: ChangeDetectorRef) {}
}

@Component({
  template: `
    <x-theme showDark></x-theme>
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
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      x-row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXDatePickerDisabledComponent {
  model = new Date();
}

@Component({
  template: `
    <x-theme showDark></x-theme>
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
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      x-row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXDatePickerRequiredComponent {
  model: any;
  constructor(private cdr: ChangeDetectorRef) {
    interval(0).subscribe((x) => {
      this.cdr.detectChanges();
    });
  }
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row>
      <x-col span="12">
        <x-date-picker [(ngModel)]="model1" label="年" type="year"></x-date-picker>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-date-picker [(ngModel)]="model2" label="月" type="month"></x-date-picker>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      x-row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXDatePickerYearOrMonthComponent {
  model1: any;
  model2: any;
  constructor(private cdr: ChangeDetectorRef) {
    interval(0).subscribe((x) => {
      this.cdr.detectChanges();
    });
  }
}
