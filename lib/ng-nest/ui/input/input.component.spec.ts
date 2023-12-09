import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, ChangeDetectorRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XInputComponent, XInputGroupComponent } from '@ng-nest/ui/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XInputPrefix } from './input.property';
import { XRowComponent, XColComponent } from '@ng-nest/ui/layout';
import { interval } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XThemeComponent } from '@ng-nest/ui/theme';
import { XRadioComponent } from '@ng-nest/ui/radio';
import { XSelectComponent } from '@ng-nest/ui/select';
import { XButtonComponent, XButtonsComponent } from '@ng-nest/ui/button';
import { XDatePickerComponent } from '@ng-nest/ui/date-picker';
import { XAutoCompleteComponent } from '@ng-nest/ui/auto-complete';
import { XCascadeComponent } from '@ng-nest/ui/cascade';
import { XColorPickerComponent } from '@ng-nest/ui/color-picker';
import { XFindComponent } from '@ng-nest/ui/find';
import { XTextareaComponent } from '@ng-nest/ui/textarea';
import { XTimePickerModule } from '@ng-nest/ui/time-picker';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe(XInputPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        XThemeComponent,
        XInputComponent,
        XInputGroupComponent,
        FormsModule,
        ReactiveFormsModule,
        XRowComponent,
        XColComponent,
        XRadioComponent,
        XSelectComponent,
        XButtonComponent,
        XButtonsComponent,
        XDatePickerComponent,
        XAutoCompleteComponent,
        XCascadeComponent,
        XColorPickerComponent,
        XFindComponent,
        XTextareaComponent,
        XTimePickerModule
      ],
      declarations: [
        TestXInputComponent,
        TestXInputLabelComponent,
        TestXInputIconComponent,
        TestXInputClearableComponent,
        TestXInputDisabledComponent,
        TestXInputRequiredComponent,
        TestXInputLengthComponent,
        TestXInputSizeComponent,
        TestXInputBorderedComponent,
        TestXInputGroupComponent,
        TestXInputBeforeAfterComponent,
        TestXInputFocusComponent
      ]
    }).compileComponents();
  });
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXInputComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXInputComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XInputComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`label.`, () => {
    let fixture: ComponentFixture<TestXInputLabelComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXInputLabelComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXInputLabelComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`icon.`, () => {
    let fixture: ComponentFixture<TestXInputIconComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXInputIconComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXInputIconComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`clearable.`, () => {
    let fixture: ComponentFixture<TestXInputClearableComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXInputClearableComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXInputClearableComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`disabled.`, () => {
    let fixture: ComponentFixture<TestXInputDisabledComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXInputDisabledComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXInputDisabledComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`required.`, () => {
    let fixture: ComponentFixture<TestXInputRequiredComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXInputRequiredComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXInputRequiredComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`length.`, () => {
    let fixture: ComponentFixture<TestXInputLengthComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXInputLengthComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXInputLengthComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`size.`, () => {
    let fixture: ComponentFixture<TestXInputSizeComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXInputSizeComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXInputSizeComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`bordered.`, () => {
    let fixture: ComponentFixture<TestXInputBorderedComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXInputBorderedComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXInputBorderedComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`group.`, () => {
    let fixture: ComponentFixture<TestXInputGroupComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXInputGroupComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXInputGroupComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`before/after.`, () => {
    let fixture: ComponentFixture<TestXInputBeforeAfterComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXInputBeforeAfterComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXInputBeforeAfterComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`focus.`, () => {
    let fixture: ComponentFixture<TestXInputFocusComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXInputFocusComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXInputFocusComponent));
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
      <x-col span="24">
        <x-input></x-input>
      </x-col>
      <x-col span="24">
        <x-input placeholder="请输入内容"></x-input>
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
      x-row > x-col:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXInputComponent {
  constructor(private cdr: ChangeDetectorRef) {
    interval(1000).subscribe(() => {
      this.cdr.detectChanges();
    });
  }
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row>
      <x-col span="24">
        <x-input label="用户名"></x-input>
      </x-col>
      <x-col span="24">
        <x-input label="用户名" direction="column-reverse"></x-input>
      </x-col>
      <x-col span="24">
        <x-input label="用户名" direction="row"></x-input>
      </x-col>
      <x-col span="24">
        <x-input label="用户名" direction="row-reverse"></x-input>
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
      x-row > x-col:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXInputLabelComponent {}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row>
      <x-col span="24">
        <x-input icon="ado-user"></x-input>
      </x-col>
      <x-col span="24">
        <x-input icon="ado-user" iconLayout="left"></x-input>
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
      x-row > x-col:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXInputIconComponent {}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row>
      <x-col span="8">
        <x-input clearable [(ngModel)]="model" (ngModelChange)="change()"></x-input>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="8">
        <x-input clearable [(ngModel)]="modelValue" (ngModelChange)="change()"></x-input>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="8">
        <x-input
          icon="ado-user"
          clearable
          [(ngModel)]="modelIcon"
          (ngModelChange)="change()"
        ></x-input>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="8">
        <x-input
          icon="ado-user"
          clearable
          [(ngModel)]="modelIcon"
          iconLayout="left"
          (ngModelChange)="change()"
        ></x-input>
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
class TestXInputClearableComponent {
  model: any;
  modelValue = '显示清除按钮';
  modelIcon: any;
  constructor(private cdr: ChangeDetectorRef) {}
  change() {
    this.cdr.detectChanges();
  }
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row>
      <x-col span="8">
        <x-input disabled></x-input>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="8">
        <x-input disabled [(ngModel)]="model"></x-input>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="8">
        <x-input disabled clearable [(ngModel)]="modelClearable"></x-input>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="8">
        <x-input icon="ado-user" disabled></x-input>
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
class TestXInputDisabledComponent {
  model = '输入框禁用';
  modelClearable = '禁用状态下，不显示清除按钮';
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row>
      <x-col span="8">
        <x-input required [(ngModel)]="value" (ngModelChange)="change()"></x-input>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="8">
        <x-input label="用户名" required [(ngModel)]="value" (ngModelChange)="change()"></x-input>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="8">
        <x-input icon="ado-user" required [(ngModel)]="value" (ngModelChange)="change()"></x-input>
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
class TestXInputRequiredComponent {
  value: any;
  constructor(private cdr: ChangeDetectorRef) {}
  change() {
    this.cdr.detectChanges();
  }
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row>
      <x-col span="24">
        <x-input [(ngModel)]="value" (ngModelChange)="change()" maxlength="50"></x-input>
      </x-col>
      <x-col span="24">
        <x-input
          [(ngModel)]="value"
          (ngModelChange)="change()"
          label="用户名"
          maxlength="50"
        ></x-input>
      </x-col>
      <x-col span="24">
        <x-input
          [(ngModel)]="value"
          (ngModelChange)="change()"
          label="用户名"
          direction="row"
          maxlength="50"
        ></x-input>
      </x-col>
      <x-col span="24">
        <x-input
          [(ngModel)]="value"
          (ngModelChange)="change()"
          icon="ado-user"
          maxlength="50"
        ></x-input>
      </x-col>
      <x-col span="24">
        <x-input
          [(ngModel)]="value"
          (ngModelChange)="change()"
          icon="ado-user"
          iconLayout="left"
          maxlength="50"
        ></x-input>
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
      x-row > x-col:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXInputLengthComponent {
  value: any;
  constructor(private cdr: ChangeDetectorRef) {}
  change() {
    this.cdr.detectChanges();
  }
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-radio [data]="radioData" [(ngModel)]="size" (ngModelChange)="change($event)"></x-radio>
    <x-row>
      <x-col span="24">
        <x-input [size]="size"></x-input>
      </x-col>
      <x-col span="24">
        <x-input [size]="size" label="用户名" direction="row" maxlength="50"></x-input>
      </x-col>
      <x-col span="24">
        <x-input [size]="size" icon="ado-user" iconLayout="left" maxlength="50"></x-input>
      </x-col>
      <x-col span="24">
        <x-input required clearable [size]="size"></x-input>
      </x-col>
      <x-col span="24">
        <x-input disabled [size]="size"></x-input>
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
      x-row > x-col > x-input {
        width: 15rem;
        display: block;
      }
      x-row > x-col:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXInputSizeComponent {
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
    <x-theme showDark></x-theme>
    <x-row>
      <x-col span="24">
        <x-input placeholder="请输入内容" bordered="false"></x-input>
      </x-col>
      <x-col span="24">
        <x-input
          placeholder="请输入内容"
          bordered="false"
          label="用户名:"
          direction="row"
          maxlength="50"
        ></x-input>
      </x-col>
      <x-col span="24">
        <x-input
          placeholder="请输入内容"
          bordered="false"
          icon="ado-user"
          iconLayout="left"
          maxlength="50"
        ></x-input>
      </x-col>
      <x-col span="24">
        <x-input placeholder="请输入内容" bordered="false" required clearable></x-input>
      </x-col>
      <x-col span="24">
        <x-input placeholder="没有边框" bordered="false" disabled></x-input>
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
      x-row > x-col > x-input {
        width: 15rem;
        display: block;
      }
      x-row > x-col:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXInputBorderedComponent {
  constructor() {}
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-input-group size="big">
      <x-row space="0.5">
        <x-col span="4">
          <x-input placeholder="输入内容"></x-input>
        </x-col>
        <x-col span="8">
          <x-input placeholder="输入内容"></x-input>
        </x-col>
      </x-row>
    </x-input-group>
    <x-input-group compact>
      <x-input [style.width.%]="15" placeholder="输入内容1"></x-input>
      <x-input [style.width.%]="25" placeholder="输入内容2"></x-input>
      <x-input [style.width.%]="35" placeholder="输入内容3"></x-input>
    </x-input-group>
    <x-input-group compact>
      <x-select [data]="['city1', 'city2', 'city3']" [style.width.%]="15"></x-select>
      <x-input [style.width.%]="25" placeholder="输入内容"></x-input>
    </x-input-group>
    <x-input-group compact>
      <x-button>查找</x-button>
      <x-input [style.width.%]="25" placeholder="输入内容"></x-input>
    </x-input-group>
    <x-input-group compact>
      <x-select [data]="['city1', 'city2', 'city3']" [style.width.%]="15"></x-select>
      <x-input [style.width.%]="25" placeholder="输入内容"></x-input>
      <x-button icon="fto-search"></x-button>
    </x-input-group>
    <x-input-group compact>
      <x-input [style.width.%]="25" placeholder="输入内容"></x-input>
      <x-date-picker [style.width.%]="25"></x-date-picker>
    </x-input-group>
    <x-input-group compact>
      <x-input [style.width.%]="25" placeholder="输入内容"></x-input>
      <x-auto-complete
        [style.width.%]="25"
        [data]="['aaaa', 'bbbb', 'cccc', 'dddd', 'aaa', 'bbb', 'ccc', 'ddd']"
        placeholder="输入下拉匹配，如：aa"
      ></x-auto-complete>
    </x-input-group>
    <x-input-group compact>
      <x-input [style.width.%]="25" placeholder="输入内容"></x-input>
      <x-cascade [style.width.%]="25" [data]="cascadeData"></x-cascade>
    </x-input-group>
    <x-input-group compact>
      <x-input [style.width.%]="25" placeholder="输入内容"></x-input>
      <x-color-picker [style.width.%]="25"></x-color-picker>
    </x-input-group>
    <x-input-group compact>
      <x-input [style.width.%]="25" placeholder="输入内容"></x-input>
      <x-find></x-find>
    </x-input-group>
    <x-input-group compact>
      <x-input [style.width.%]="25" placeholder="输入内容"></x-input>
      <x-time-picker></x-time-picker>
    </x-input-group>
    <x-input-group compact>
      <x-input [style.width.%]="25" placeholder="输入内容"></x-input>
      <x-textarea [style.width.%]="25"></x-textarea>
    </x-input-group>
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      :host x-input-group:not(:first-child) {
        margin-top: 1rem;
        display: block;
      }
    `
  ]
})
class TestXInputGroupComponent {
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
  constructor(private cdr: ChangeDetectorRef) {
    interval(0).subscribe(() => this.cdr.detectChanges());
  }
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row>
      <x-col span="24">
        <x-input placeholder="请输入域名" after=".com"></x-input>
      </x-col>
      <x-col span="24">
        <x-input placeholder="请输入电话" before="0728"></x-input>
      </x-col>
      <x-col span="24">
        <x-input placeholder="请输入网址" before="http://" after=".com"></x-input>
      </x-col>
      <x-col span="24">
        <x-input placeholder="请输入网址" [before]="beforeSelectTpl"></x-input>
      </x-col>
      <x-col span="24">
        <x-input placeholder="请输入网址" [after]="afterSelectTpl"></x-input>
      </x-col>
      <x-col span="24">
        <x-input
          placeholder="请输入网址"
          [before]="beforeSelectTpl"
          [after]="afterSelectTpl"
        ></x-input>
      </x-col>
      <x-col span="24">
        <x-input placeholder="请输入文字" [before]="beforeButtonTpl"></x-input>
      </x-col>
      <x-col span="24">
        <x-input placeholder="请输入文字" [after]="afterButtonTpl"></x-input>
      </x-col>
      <x-col span="24">
        <x-input
          placeholder="请输入文字"
          [before]="beforeButtonTpl"
          [after]="afterButtonTpl"
        ></x-input>
      </x-col>
      <x-col span="24">
        <x-input placeholder="请输入文字" [before]="beforeInputTpl"></x-input>
      </x-col>
      <x-col span="24">
        <x-input placeholder="请输入文字" [after]="afterInputTpl"></x-input>
      </x-col>
      <x-col span="24">
        <x-input
          placeholder="请输入文字"
          [before]="beforeInputTpl"
          [after]="afterInputTpl"
        ></x-input>
      </x-col>
      <x-col span="24">
        <x-input placeholder="请输入文字" [before]="beforeDatePickerTpl"></x-input>
      </x-col>
      <x-col span="24">
        <x-input placeholder="请输入文字" [after]="afterDatePickerTpl"></x-input>
      </x-col>
      <x-col span="24">
        <x-input
          placeholder="请输入文字"
          [before]="beforeDatePickerTpl"
          [after]="afterDatePickerTpl"
        ></x-input>
      </x-col>
      <x-col span="24">
        <x-input placeholder="请输入文字" [before]="beforeAutoCompleteTpl"></x-input>
      </x-col>
      <x-col span="24">
        <x-input placeholder="请输入文字" [after]="afterAutoCompleteTpl"></x-input>
      </x-col>
      <x-col span="24">
        <x-input
          placeholder="请输入文字"
          [before]="beforeAutoCompleteTpl"
          [after]="afterAutoCompleteTpl"
        ></x-input>
      </x-col>
      <x-col span="24">
        <x-input placeholder="请输入文字" [before]="beforeCascadeTpl"></x-input>
      </x-col>
      <x-col span="24">
        <x-input placeholder="请输入文字" [after]="afterCascadeTpl"></x-input>
      </x-col>
      <x-col span="24">
        <x-input
          placeholder="请输入文字"
          [before]="beforeCascadeTpl"
          [after]="afterCascadeTpl"
        ></x-input>
      </x-col>
      <x-col span="24">
        <x-input placeholder="请输入文字" [before]="beforeColorPickerTpl"></x-input>
      </x-col>
      <x-col span="24">
        <x-input placeholder="请输入文字" [after]="afterColorPickerTpl"></x-input>
      </x-col>
      <x-col span="24">
        <x-input
          placeholder="请输入文字"
          [before]="beforeColorPickerTpl"
          [after]="afterColorPickerTpl"
        ></x-input>
      </x-col>
      <x-col span="24">
        <x-input placeholder="请输入文字" [before]="beforeTimePickerTpl"></x-input>
      </x-col>
      <x-col span="24">
        <x-input placeholder="请输入文字" [after]="afterTimePickerTpl"></x-input>
      </x-col>
      <x-col span="24">
        <x-input
          placeholder="请输入文字"
          [before]="beforeTimePickerTpl"
          [after]="afterTimePickerTpl"
        ></x-input>
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
class TestXInputBeforeAfterComponent {
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
      <x-col span="24">
        <x-buttons>
          <x-button (click)="inputCom.inputFocus('select')">设置焦点（选中文字）</x-button>
          <x-button (click)="inputCom.inputFocus('before')">设置焦点（光标在文字前）</x-button>
          <x-button (click)="inputCom.inputFocus()">设置焦点（光标在文字后，默认）</x-button>
        </x-buttons>
      </x-col>
      <x-col span="24">
        <x-input #inputCom [style.width.rem]="15" [(ngModel)]="inputValue"></x-input>
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
      x-row x-col:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXInputFocusComponent {
  inputValue = 'Please enter the content';
  // @ViewChild('inputCom') inputCom!: XInputComponent;
}
