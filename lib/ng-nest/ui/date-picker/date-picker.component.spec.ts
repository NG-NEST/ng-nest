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
import { XButtonModule } from '@ng-nest/ui/button';
import { XI18nService, en_US, zh_CN, X_I18N, zh_TW } from '@ng-nest/ui/i18n';
import { XRadioModule } from '@ng-nest/ui/radio';

describe(XDatePickerPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, XDatePickerModule, FormsModule, ReactiveFormsModule, XLayoutModule, XButtonModule, XRadioModule],
      declarations: [
        TestXDatePickerComponent,
        TestXDatePickerLabelComponent,
        TestXDatePickerDisabledComponent,
        TestXDatePickerRequiredComponent,
        TestXDatePickerYearOrMonthComponent,
        TestXDatePickerHourMinuteSecondComponent,
        TestXDatePickerSizeComponent,
        TestXDatePickerBorderedComponent,
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
  describe(`hour minute second.`, () => {
    let fixture: ComponentFixture<TestXDatePickerHourMinuteSecondComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXDatePickerHourMinuteSecondComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXDatePickerHourMinuteSecondComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`size.`, () => {
    let fixture: ComponentFixture<TestXDatePickerSizeComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXDatePickerSizeComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXDatePickerSizeComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  fdescribe(`bordered.`, () => {
    let fixture: ComponentFixture<TestXDatePickerBorderedComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXDatePickerBorderedComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXDatePickerBorderedComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  template: `
    <x-button (click)="english()">切换为英文</x-button>
    <x-button (click)="chinese()">切换为中文</x-button>
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
  constructor(private i18nService: XI18nService, private cdr: ChangeDetectorRef) {
    interval(0).subscribe((x) => {
      this.cdr.detectChanges();
    });
  }

  english() {
    this.i18nService.setLocale(en_US);
    this.cdr.detectChanges();
  }

  chinese() {
    this.i18nService.setLocale(zh_CN);
    this.cdr.detectChanges();
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

@Component({
  template: `
    <x-row>
      <x-col span="8">
        <x-date-picker [(ngModel)]="model1" label="时分秒" type="date-time"></x-date-picker>
      </x-col>
      <x-col span="8">
        <x-date-picker [(ngModel)]="model1" label="时分" type="date-minute"></x-date-picker>
      </x-col>
      <x-col span="8">
        <x-date-picker [(ngModel)]="model1" label="时" type="date-hour"></x-date-picker>
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
class TestXDatePickerHourMinuteSecondComponent {
  model1 = '2011-10-1 13:10:57';
  model2: any;
  model3: any;
  constructor(private cdr: ChangeDetectorRef) {
    interval(0).subscribe((x) => {
      this.cdr.detectChanges();
    });
  }
}

@Component({
  template: `
    <x-radio [data]="radioData" [(ngModel)]="size" (ngModelChange)="change($event)"></x-radio>
    <x-row>
      <x-col span="24">
        <x-date-picker [size]="size"></x-date-picker>
      </x-col>
      <x-col span="24">
        <x-date-picker [size]="size" label="用户名" direction="row" maxlength="50"></x-date-picker>
      </x-col>
      <x-col span="24">
        <x-date-picker [size]="size" label="用户名" direction="column" maxlength="50"></x-date-picker>
      </x-col>
      <x-col span="24">
        <x-date-picker [size]="size" icon="ado-user" iconLayout="left" maxlength="50"></x-date-picker>
      </x-col>
      <x-col span="24">
        <x-date-picker required clearable [size]="size"></x-date-picker>
      </x-col>
      <x-col span="24">
        <x-date-picker disabled [size]="size"></x-date-picker>
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
      x-row > x-col > x-date-picker {
        width: 15rem;
        display: block;
      }
      x-row > x-col:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXDatePickerSizeComponent {
  radioData = ['big', 'large', 'medium', 'small', 'mini'];
  size = 'medium';
  constructor(private cdr: ChangeDetectorRef) {}
  change($event: string) {
    console.log($event);
    this.cdr.detectChanges();
  }
}

@Component({
  template: `
    <x-row>
      <x-col span="24">
        <x-date-picker placeholder="请选择日期" bordered="false"></x-date-picker>
      </x-col>
      <x-col span="24">
        <x-date-picker placeholder="请选择日期" bordered="false" label="日生:" direction="row" ></x-date-picker>
      </x-col>
      <x-col span="24">
        <x-date-picker placeholder="请选择日期" bordered="false" ></x-date-picker>
      </x-col>
      <x-col span="24">
        <x-date-picker placeholder="请选择日期" bordered="false" required></x-date-picker>
      </x-col>
      <x-col span="24">
        <x-date-picker placeholder="没有边框" bordered="false" disabled></x-date-picker>
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
      x-row > x-col > x-date-picker {
        width: 15rem;
        display: block;
      }
      x-row > x-col:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXDatePickerBorderedComponent {
  constructor() {}
}