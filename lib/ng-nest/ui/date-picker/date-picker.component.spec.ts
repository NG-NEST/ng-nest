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
import { XSelectModule } from '@ng-nest/ui/select';
import { XAutoCompleteModule } from '@ng-nest/ui/auto-complete';
import { XCascadeModule } from '@ng-nest/ui/cascade';
import { XColorPickerModule } from '@ng-nest/ui/color-picker';
import { XFindModule } from '@ng-nest/ui/find';
import { XTextareaModule } from '@ng-nest/ui/textarea';
import { XTimePickerModule } from '@ng-nest/ui/time-picker';
import { XInputModule } from '@ng-nest/ui/input';

describe(XDatePickerPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        XDatePickerModule,
        FormsModule,
        ReactiveFormsModule,
        XLayoutModule,
        XButtonModule,
        XRadioModule,
        XSelectModule,
        XInputModule,
        XAutoCompleteModule,
        XCascadeModule,
        XColorPickerModule,
        XFindModule,
        XTextareaModule,
        XTimePickerModule
      ],
      declarations: [
        TestXDatePickerComponent,
        TestXDatePickerLabelComponent,
        TestXDatePickerDisabledComponent,
        TestXDatePickerRequiredComponent,
        TestXDatePickerYearOrMonthComponent,
        TestXDatePickerHourMinuteSecondComponent,
        TestXDatePickerSizeComponent,
        TestXDatePickerBorderedComponent,
        TestXDatePickerBeforeAfterComponent
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
  describe(`bordered.`, () => {
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
  fdescribe(`before/after.`, () => {
    let fixture: ComponentFixture<TestXDatePickerBeforeAfterComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXDatePickerBeforeAfterComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXDatePickerBeforeAfterComponent));
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
        <x-date-picker placeholder="请选择日期" bordered="false" label="日生:" direction="row"></x-date-picker>
      </x-col>
      <x-col span="24">
        <x-date-picker placeholder="请选择日期" bordered="false"></x-date-picker>
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

@Component({
  template: `
    <x-row>
      <x-col span="24">
        <x-date-picker placeholder="请输入域名" after=".com"></x-date-picker>
      </x-col>
      <x-col span="24">
        <x-date-picker placeholder="请输入电话" before="0728"></x-date-picker>
      </x-col>
      <x-col span="24">
        <x-date-picker placeholder="请输入网址" before="http://" after=".com"></x-date-picker>
      </x-col>
      <x-col span="24">
        <x-date-picker placeholder="请输入网址" [before]="beforeSelectTpl"></x-date-picker>
      </x-col>
      <x-col span="24">
        <x-date-picker placeholder="请输入网址" [after]="afterSelectTpl"></x-date-picker>
      </x-col>
      <x-col span="24">
        <x-date-picker placeholder="请输入网址" [before]="beforeSelectTpl" [after]="afterSelectTpl"></x-date-picker>
      </x-col>
      <x-col span="24">
        <x-date-picker placeholder="请输入文字" [before]="beforeButtonTpl"></x-date-picker>
      </x-col>
      <x-col span="24">
        <x-date-picker placeholder="请输入文字" [after]="afterButtonTpl"></x-date-picker>
      </x-col>
      <x-col span="24">
        <x-date-picker placeholder="请输入文字" [before]="beforeButtonTpl" [after]="afterButtonTpl"></x-date-picker>
      </x-col>
      <x-col span="24">
        <x-date-picker placeholder="请输入文字" [before]="beforeInputTpl"></x-date-picker>
      </x-col>
      <x-col span="24">
        <x-date-picker placeholder="请输入文字" [after]="afterInputTpl"></x-date-picker>
      </x-col>
      <x-col span="24">
        <x-date-picker placeholder="请输入文字" [before]="beforeInputTpl" [after]="afterInputTpl"></x-date-picker>
      </x-col>
      <x-col span="24">
        <x-date-picker placeholder="请输入文字" [before]="beforeDatePickerTpl"></x-date-picker>
      </x-col>
      <x-col span="24">
        <x-date-picker placeholder="请输入文字" [after]="afterDatePickerTpl"></x-date-picker>
      </x-col>
      <x-col span="24">
        <x-date-picker placeholder="请输入文字" [before]="beforeDatePickerTpl" [after]="afterDatePickerTpl"></x-date-picker>
      </x-col>
      <x-col span="24">
        <x-date-picker placeholder="请输入文字" [before]="beforeAutoCompleteTpl"></x-date-picker>
      </x-col>
      <x-col span="24">
        <x-date-picker placeholder="请输入文字" [after]="afterAutoCompleteTpl"></x-date-picker>
      </x-col>
      <x-col span="24">
        <x-date-picker placeholder="请输入文字" [before]="beforeAutoCompleteTpl" [after]="afterAutoCompleteTpl"></x-date-picker>
      </x-col>
      <x-col span="24">
        <x-date-picker placeholder="请输入文字" [before]="beforeCascadeTpl"></x-date-picker>
      </x-col>
      <x-col span="24">
        <x-date-picker placeholder="请输入文字" [after]="afterCascadeTpl"></x-date-picker>
      </x-col>
      <x-col span="24">
        <x-date-picker placeholder="请输入文字" [before]="beforeCascadeTpl" [after]="afterCascadeTpl"></x-date-picker>
      </x-col>
      <x-col span="24">
        <x-date-picker placeholder="请输入文字" [before]="beforeColorPickerTpl"></x-date-picker>
      </x-col>
      <x-col span="24">
        <x-date-picker placeholder="请输入文字" [after]="afterColorPickerTpl"></x-date-picker>
      </x-col>
      <x-col span="24">
        <x-date-picker placeholder="请输入文字" [before]="beforeColorPickerTpl" [after]="afterColorPickerTpl"></x-date-picker>
      </x-col>
      <x-col span="24">
        <x-date-picker placeholder="请输入文字" [before]="beforeTimePickerTpl"></x-date-picker>
      </x-col>
      <x-col span="24">
        <x-date-picker placeholder="请输入文字" [after]="afterTimePickerTpl"></x-date-picker>
      </x-col>
      <x-col span="24">
        <x-date-picker placeholder="请输入文字" [before]="beforeTimePickerTpl" [after]="afterTimePickerTpl"></x-date-picker>
      </x-col>
    </x-row>
    <ng-template #beforeSelectTpl>
      <x-select [style.width.%]="30" [data]="['http://', 'ws://', 'file://']"></x-select>
    </ng-template>
    <ng-template #afterSelectTpl>
      <x-select [style.width.%]="30" [data]="['.com', '.cn', '.org']"></x-select>
    </ng-template>
    <ng-template #beforeButtonTpl>
      <x-button>查询</x-button>
    </ng-template>
    <ng-template #afterButtonTpl>
      <x-button icon="fto-search"></x-button>
    </ng-template>
    <ng-template #beforeInputTpl>
      <x-date-picker [style.width.%]="30"></x-date-picker>
    </ng-template>
    <ng-template #afterInputTpl>
      <x-date-picker [style.width.%]="30"></x-date-picker>
    </ng-template>
    <ng-template #beforeDatePickerTpl>
      <x-date-picker [style.width.%]="30"></x-date-picker>
    </ng-template>
    <ng-template #afterDatePickerTpl>
      <x-date-picker [style.width.%]="30"></x-date-picker>
    </ng-template>
    <ng-template #beforeAutoCompleteTpl>
      <x-auto-complete
        [style.width.%]="40"
        [data]="['aaaa', 'bbbb', 'cccc', 'dddd', 'aaa', 'bbb', 'ccc', 'ddd']"
        placeholder="输入下拉匹配，如：aa"
      ></x-auto-complete>
    </ng-template>
    <ng-template #afterAutoCompleteTpl>
      <x-auto-complete
        [style.width.%]="40"
        [data]="['aaaa', 'bbbb', 'cccc', 'dddd', 'aaa', 'bbb', 'ccc', 'ddd']"
        placeholder="输入下拉匹配，如：aa"
      ></x-auto-complete>
    </ng-template>
    <ng-template #beforeCascadeTpl>
      <x-cascade [style.width.%]="40" [data]="cascadeData"></x-cascade>
    </ng-template>
    <ng-template #afterCascadeTpl>
      <x-cascade [style.width.%]="40" [data]="cascadeData"></x-cascade>
    </ng-template>
    <ng-template #beforeColorPickerTpl>
      <x-color-picker [style.width.%]="30"></x-color-picker>
    </ng-template>
    <ng-template #afterColorPickerTpl>
      <x-color-picker [style.width.%]="30"></x-color-picker>
    </ng-template>
    <ng-template #beforeTimePickerTpl>
      <x-time-picker [style.width.%]="30"></x-time-picker>
    </ng-template>
    <ng-template #afterTimePickerTpl>
      <x-time-picker [style.width.%]="30"></x-time-picker>
    </ng-template>
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      x-row {
        width: 25rem;
      }
      x-row > x-col:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXDatePickerBeforeAfterComponent {
  cascadeData = [
    { id: 1, label: 'AAAA' },
    { id: 2, label: 'BBBB' },
    { id: 3, label: 'CCCC' },
    { id: 4, label: 'DDDD' },
    { id: 5, label: 'AAAA-1', pid: 1 },
    { id: 6, label: 'AAAA-2', pid: 1 },
    { id: 7, label: 'AAAA-3', pid: 1 },
    { id: 8, label: 'AAAA-4', pid: 1 },
    { id: 9, label: 'BBBB-1', pid: 2 },
    { id: 10, label: 'BBBB-2', pid: 2 },
    { id: 11, label: 'BBBB-3', pid: 2 },
    { id: 12, label: 'BBBB-4', pid: 2 },
    { id: 13, label: 'CCCC-1', pid: 3 },
    { id: 14, label: 'CCCC-2', pid: 3 },
    { id: 15, label: 'CCCC-3', pid: 3 },
    { id: 16, label: 'CCCC-4', pid: 3 },
    { id: 17, label: 'DDDD-1', pid: 4 },
    { id: 18, label: 'DDDD-2', pid: 4 },
    { id: 19, label: 'DDDD-3', pid: 4 },
    { id: 20, label: 'DDDD-4', pid: 4 },
    { id: 21, label: 'AAAA-1-1', pid: 5 },
    { id: 22, label: 'AAAA-1-2', pid: 5 },
    { id: 23, label: 'AAAA-1-3', pid: 5 },
    { id: 24, label: 'AAAA-1-4', pid: 5 },
    { id: 25, label: 'AAAA-2-1', pid: 6 },
    { id: 26, label: 'AAAA-2-2', pid: 6 },
    { id: 27, label: 'AAAA-2-3', pid: 6 },
    { id: 28, label: 'AAAA-2-4', pid: 6 },
    { id: 29, label: 'AAAA-3-1', pid: 7 },
    { id: 30, label: 'AAAA-3-2', pid: 7 },
    { id: 31, label: 'AAAA-3-3', pid: 7 },
    { id: 32, label: 'AAAA-3-4', pid: 7 },
    { id: 33, label: 'AAAA-4-1', pid: 8 },
    { id: 34, label: 'AAAA-4-2', pid: 8 },
    { id: 35, label: 'AAAA-4-3', pid: 8 },
    { id: 36, label: 'AAAA-4-4', pid: 8 }
  ];
  constructor() {}
}
