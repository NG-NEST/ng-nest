import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component, DebugElement, ChangeDetectorRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XAutoCompleteComponent } from '@ng-nest/ui/auto-complete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XAutoCompletePrefix, XAutoCompleteNode } from './auto-complete.property';
import { XRowComponent, XColComponent } from '@ng-nest/ui/layout';
import { Observable, interval } from 'rxjs';
import { XData } from '@ng-nest/ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XThemeModule } from '@ng-nest/ui/theme';
import { XRadioModule } from '@ng-nest/ui/radio';
import { XInputComponent } from '@ng-nest/ui/input';
import { XSelectModule } from '@ng-nest/ui/select';
import { XCascadeComponent } from '@ng-nest/ui/cascade';
import { XColorPickerComponent } from '@ng-nest/ui/color-picker';
import { XFindComponent } from '@ng-nest/ui/find';
import { XTextareaModule } from '@ng-nest/ui/textarea';
import { XTimePickerModule } from '@ng-nest/ui/time-picker';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XDatePickerComponent } from '@ng-nest/ui/date-picker';
import { XIconComponent } from '@ng-nest/ui/icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe(XAutoCompletePrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        XThemeModule,
        XAutoCompleteComponent,
        FormsModule,
        ReactiveFormsModule,
        XRowComponent,
        XColComponent,
        XRadioModule,
        XSelectModule,
        XButtonComponent,
        XInputComponent,
        XCascadeComponent,
        XColorPickerComponent,
        XFindComponent,
        XTextareaModule,
        XTimePickerModule,
        XDatePickerComponent,
        XIconComponent
      ],
      declarations: [
        TestXAutoCompleteComponent,
        TestXAutoCompleteAsyncComponent,
        TestXAutoCompleteLabelComponent,
        TestXAutoCompleteDisabledComponent,
        TestXAutoCompleteRequiredComponent,
        TestXAutoCompleteSizeComponent,
        TestXAutoCompleteBorderedComponent,
        TestXAutoCompleteBeforeAfterComponent,
        TestXAutoCompleteCustomComponent
      ]
    }).compileComponents();
  });
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXAutoCompleteComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXAutoCompleteComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XAutoCompleteComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`async.`, () => {
    let fixture: ComponentFixture<TestXAutoCompleteAsyncComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXAutoCompleteAsyncComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XAutoCompleteComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`label.`, () => {
    let fixture: ComponentFixture<TestXAutoCompleteLabelComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXAutoCompleteLabelComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XAutoCompleteComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`disabled.`, () => {
    let fixture: ComponentFixture<TestXAutoCompleteDisabledComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXAutoCompleteDisabledComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XAutoCompleteComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`required.`, () => {
    let fixture: ComponentFixture<TestXAutoCompleteRequiredComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXAutoCompleteRequiredComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XAutoCompleteComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`size.`, () => {
    let fixture: ComponentFixture<TestXAutoCompleteSizeComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXAutoCompleteSizeComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XAutoCompleteComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`bordered.`, () => {
    let fixture: ComponentFixture<TestXAutoCompleteBorderedComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXAutoCompleteBorderedComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XAutoCompleteComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`before/after.`, () => {
    let fixture: ComponentFixture<TestXAutoCompleteBeforeAfterComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXAutoCompleteBeforeAfterComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XAutoCompleteComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`value custom.`, () => {
    let fixture: ComponentFixture<TestXAutoCompleteCustomComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXAutoCompleteCustomComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XAutoCompleteComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
});

const data: XData<XAutoCompleteNode> = [
  'AAAA',
  'AAA',
  'BBBB',
  'CCCC',
  'DDDD',
  'EEEE',
  'FFFF',
  'GGGG',
  'HHHH',
  'IIII',
  'JJJJ'
];

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row>
      <x-col span="8">
        <x-auto-complete [data]="data1" [(ngModel)]="model1"></x-auto-complete>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="8">
        <x-auto-complete [data]="data2" [(ngModel)]="model2"></x-auto-complete>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      :host {
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      x-row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXAutoCompleteComponent {
  data1 = data;
  data2 = JSON.parse(JSON.stringify(data));
  model1: any;
  model2: any = 'BBBB';
  constructor(public cdr: ChangeDetectorRef) {
    interval(0).subscribe(() => this.cdr.detectChanges());
  }
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row>
      <x-col>
        <x-auto-complete label="方式" [data]="data" [(ngModel)]="model"></x-auto-complete>
      </x-col>
    </x-row>
    <x-row>
      <x-col>
        <x-auto-complete label="方式" [data]="data" [(ngModel)]="model" direction="column-reverse"></x-auto-complete>
      </x-col>
    </x-row>
    <x-row>
      <x-col>
        <x-auto-complete label="方式" [data]="data" [(ngModel)]="model" direction="row"></x-auto-complete>
      </x-col>
    </x-row>
    <x-row>
      <x-col>
        <x-auto-complete label="方式" [data]="data" [(ngModel)]="model" direction="row-reverse"></x-auto-complete>
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
      x-row > x-col {
        width: 10rem;
      }
      x-row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXAutoCompleteLabelComponent {
  data = data;
  model: any;
  constructor(public cdr: ChangeDetectorRef) {}
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row>
      <x-col>
        <x-auto-complete [data]="data" disabled></x-auto-complete>
      </x-col>
    </x-row>
    <x-row>
      <x-col>
        <x-auto-complete [data]="data" [(ngModel)]="model" disabled></x-auto-complete>
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
      x-row > x-col {
        width: 10rem;
      }
      x-row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXAutoCompleteDisabledComponent {
  data = data;
  model = 'DDDD';
  constructor(public cdr: ChangeDetectorRef) {}
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row>
      <x-col>
        <x-auto-complete [data]="data" [(ngModel)]="model1" required></x-auto-complete>
      </x-col>
    </x-row>
    <x-row>
      <x-col>
        <x-auto-complete [data]="data" [(ngModel)]="model2" label="选择" required></x-auto-complete>
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
      x-row > x-col {
        width: 10rem;
      }
      x-row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXAutoCompleteRequiredComponent {
  data = data;
  model1: any;
  model2: any;
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row>
      <x-col>
        <x-auto-complete [data]="data" [(ngModel)]="model"></x-auto-complete>
      </x-col>
      <x-col>
        <x-auto-complete [data]="data" [(ngModel)]="model1" (ngModelChange)="change()"></x-auto-complete>
      </x-col>
      <x-col>
        <x-auto-complete [data]="data1" [(ngModel)]="model2"></x-auto-complete>
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
      x-row > x-col {
        width: 10rem;
      }
      x-row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXAutoCompleteAsyncComponent {
  model!: string;
  model1 = 'QQ';
  data = new Observable<string[]>((x) => {
    // 替换成http请求，或者data直接定义成 Observable 对象
    setTimeout(() => {
      x.next(['qqq', 'qqqq', 'qqqqq', 'qqqqqq', 'qqqqqqqq', 'qqqqqqqqqqq', 'qqqqqqqqqqqqqq', '微信', '钉钉', '微博']);
      x.complete();
    }, 500);
  });

  data1 = (str: string) =>
    new Observable<string[]>((x) => {
      // 替换成http请求
      setTimeout(() => {
        x.next([`${str}`, `${str}${str}`, `${str}${str}${str}`]);
        x.complete();
      }, 500);
    });
  constructor(private cdr: ChangeDetectorRef) {}
  change() {
    console.log(this.model, this.model1);
    this.cdr.detectChanges();
  }
}

@Component({
  template: `
    <x-radio [data]="radioData" [(ngModel)]="size" (ngModelChange)="change($event)"></x-radio>
    <x-row>
      <x-col span="24">
        <x-auto-complete [size]="size" [data]="data"></x-auto-complete>
      </x-col>
      <x-col span="24">
        <x-auto-complete [size]="size" label="用户名" [data]="data" direction="row" maxlength="50"></x-auto-complete>
      </x-col>
      <x-col span="24">
        <x-auto-complete [size]="size" label="用户名" [data]="data" direction="column" maxlength="50"></x-auto-complete>
      </x-col>
      <x-col span="24">
        <x-auto-complete [size]="size" icon="ado-user" [data]="data" iconLayout="left" maxlength="50"></x-auto-complete>
      </x-col>
      <x-col span="24">
        <x-auto-complete required clearable [size]="size" [data]="data"></x-auto-complete>
      </x-col>
      <x-col span="24">
        <x-auto-complete disabled [size]="size" [data]="data"></x-auto-complete>
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
      x-row > x-col > x-auto-complete {
        width: 15rem;
        display: block;
      }
      x-row > x-col:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXAutoCompleteSizeComponent {
  radioData = ['big', 'large', 'medium', 'small', 'mini'];
  size = 'medium';
  data: XData<XAutoCompleteNode> = [
    'AAAA',
    'AAA',
    'BBBB',
    'CCCC',
    'DDDD',
    'EEEE',
    'FFFF',
    'GGGG',
    'HHHH',
    'IIII',
    'JJJJ'
  ];
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
        <x-auto-complete placeholder="请输入类内容" bordered="false"></x-auto-complete>
      </x-col>
      <x-col span="24">
        <x-auto-complete placeholder="请输入类内容" bordered="false" label="日生:" direction="row"></x-auto-complete>
      </x-col>
      <x-col span="24">
        <x-auto-complete placeholder="请输入类内容" bordered="false"></x-auto-complete>
      </x-col>
      <x-col span="24">
        <x-auto-complete placeholder="请输入类内容" bordered="false" required></x-auto-complete>
      </x-col>
      <x-col span="24">
        <x-auto-complete placeholder="没有边框" bordered="false" disabled></x-auto-complete>
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
      x-row > x-col > x-auto-complete {
        width: 15rem;
        display: block;
      }
      x-row > x-col:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXAutoCompleteBorderedComponent {
  constructor() {}
}

@Component({
  template: `
    <x-row>
      <x-col span="24">
        <x-auto-complete placeholder="请输入域名" after=".com"></x-auto-complete>
      </x-col>
      <x-col span="24">
        <x-auto-complete placeholder="请输入电话" before="0728"></x-auto-complete>
      </x-col>
      <x-col span="24">
        <x-auto-complete placeholder="请输入网址" before="http://" after=".com"></x-auto-complete>
      </x-col>
      <x-col span="24">
        <x-auto-complete placeholder="请输入网址" [before]="beforeSelectTpl"></x-auto-complete>
      </x-col>
      <x-col span="24">
        <x-auto-complete placeholder="请输入网址" [after]="afterSelectTpl"></x-auto-complete>
      </x-col>
      <x-col span="24">
        <x-auto-complete placeholder="请输入网址" [before]="beforeSelectTpl" [after]="afterSelectTpl"></x-auto-complete>
      </x-col>
      <x-col span="24">
        <x-auto-complete placeholder="请输入文字" [before]="beforeButtonTpl"></x-auto-complete>
      </x-col>
      <x-col span="24">
        <x-auto-complete placeholder="请输入文字" [after]="afterButtonTpl"></x-auto-complete>
      </x-col>
      <x-col span="24">
        <x-auto-complete placeholder="请输入文字" [before]="beforeButtonTpl" [after]="afterButtonTpl"></x-auto-complete>
      </x-col>
      <x-col span="24">
        <x-auto-complete placeholder="请输入文字" [before]="beforeInputTpl"></x-auto-complete>
      </x-col>
      <x-col span="24">
        <x-auto-complete placeholder="请输入文字" [after]="afterInputTpl"></x-auto-complete>
      </x-col>
      <x-col span="24">
        <x-auto-complete placeholder="请输入文字" [before]="beforeInputTpl" [after]="afterInputTpl"></x-auto-complete>
      </x-col>
      <x-col span="24">
        <x-auto-complete placeholder="请输入文字" [before]="beforeDatePickerTpl"></x-auto-complete>
      </x-col>
      <x-col span="24">
        <x-auto-complete placeholder="请输入文字" [after]="afterDatePickerTpl"></x-auto-complete>
      </x-col>
      <x-col span="24">
        <x-auto-complete
          placeholder="请输入文字"
          [before]="beforeDatePickerTpl"
          [after]="afterDatePickerTpl"
        ></x-auto-complete>
      </x-col>
      <x-col span="24">
        <x-auto-complete placeholder="请输入文字" [before]="beforeAutoCompleteTpl"></x-auto-complete>
      </x-col>
      <x-col span="24">
        <x-auto-complete placeholder="请输入文字" [after]="afterAutoCompleteTpl"></x-auto-complete>
      </x-col>
      <x-col span="24">
        <x-auto-complete
          placeholder="请输入文字"
          [before]="beforeAutoCompleteTpl"
          [after]="afterAutoCompleteTpl"
        ></x-auto-complete>
      </x-col>
      <x-col span="24">
        <x-auto-complete placeholder="请输入文字" [before]="beforeCascadeTpl"></x-auto-complete>
      </x-col>
      <x-col span="24">
        <x-auto-complete placeholder="请输入文字" [after]="afterCascadeTpl"></x-auto-complete>
      </x-col>
      <x-col span="24">
        <x-auto-complete
          placeholder="请输入文字"
          [before]="beforeCascadeTpl"
          [after]="afterCascadeTpl"
        ></x-auto-complete>
      </x-col>
      <x-col span="24">
        <x-auto-complete placeholder="请输入文字" [before]="beforeColorPickerTpl"></x-auto-complete>
      </x-col>
      <x-col span="24">
        <x-auto-complete placeholder="请输入文字" [after]="afterColorPickerTpl"></x-auto-complete>
      </x-col>
      <x-col span="24">
        <x-auto-complete
          placeholder="请输入文字"
          [before]="beforeColorPickerTpl"
          [after]="afterColorPickerTpl"
        ></x-auto-complete>
      </x-col>
      <x-col span="24">
        <x-auto-complete placeholder="请输入文字" [before]="beforeTimePickerTpl"></x-auto-complete>
      </x-col>
      <x-col span="24">
        <x-auto-complete placeholder="请输入文字" [after]="afterTimePickerTpl"></x-auto-complete>
      </x-col>
      <x-col span="24">
        <x-auto-complete
          placeholder="请输入文字"
          [before]="beforeTimePickerTpl"
          [after]="afterTimePickerTpl"
        ></x-auto-complete>
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
      <x-input [style.width.%]="30"></x-input>
    </ng-template>
    <ng-template #afterInputTpl>
      <x-input [style.width.%]="30"></x-input>
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
class TestXAutoCompleteBeforeAfterComponent {
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

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row>
      <x-col span="8">
        <x-auto-complete [data]="data1" [(ngModel)]="model1" [nodeTpl]="nodeTpl"></x-auto-complete>
      </x-col>
    </x-row>
    <ng-template #nodeTpl let-node="$node">
      <span class="select-item"><x-icon type="fto-user"></x-icon> {{ node?.label }} </span>
    </ng-template>
  `,
  styles: [
    `
      :host {
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      x-row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXAutoCompleteCustomComponent {
  data1 = data;
  data2 = JSON.parse(JSON.stringify(data));
  model1: any;
  model2: any = 'BBBB';
  constructor(public cdr: ChangeDetectorRef) {
    interval(0).subscribe(() => this.cdr.detectChanges());
  }
}
