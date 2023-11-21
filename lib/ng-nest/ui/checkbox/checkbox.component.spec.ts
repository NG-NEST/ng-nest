import { XButtonComponent } from '@ng-nest/ui/button';
import { Observable } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XCheckboxComponent } from './checkbox.component';
import { Component, DebugElement, ChangeDetectorRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { XCheckboxModule } from '@ng-nest/ui/checkbox';
import { FormsModule } from '@angular/forms';
import { XCheckboxPrefix, XCheckboxNode } from './checkbox.property';
import { XData } from '@ng-nest/ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XThemeModule } from '@ng-nest/ui/theme';
import { XSelectModule } from '@ng-nest/ui/select';
import { XDatePickerModule } from '@ng-nest/ui/date-picker';
import { XAutoCompleteModule } from '@ng-nest/ui/auto-complete';
import { XCascadeModule } from '@ng-nest/ui/cascade';
import { XColorPickerModule } from '@ng-nest/ui/color-picker';
import { XFindModule } from '@ng-nest/ui/find';
import { XTextareaModule } from '@ng-nest/ui/textarea';
import { XTimePickerModule } from '@ng-nest/ui/time-picker';
import { XInputModule } from '@ng-nest/ui/input';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { XTagModule } from '@ng-nest/ui/tag';

describe(XCheckboxPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        XThemeModule,
        FormsModule,
        XCheckboxModule,
        XButtonComponent,
        XAutoCompleteModule,
        XSelectModule,
        XDatePickerModule,
        XLayoutModule,
        XCascadeModule,
        XColorPickerModule,
        XFindModule,
        XTextareaModule,
        XTimePickerModule,
        XInputModule,
        XTagModule
      ],
      declarations: [
        TestXCheckboxComponent,
        TestXCheckboxDisabledComponent,
        TestXCheckboxButtonComponent,
        TestXCheckboxIconComponent,
        TestXCheckboxAsyncComponent,
        TestXCheckboxIndeterminateComponent
      ]
    }).compileComponents();
  });
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXCheckboxComponent>;
    let checkbox: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXCheckboxComponent);
      fixture.detectChanges();
      checkbox = fixture.debugElement.query(By.directive(XCheckboxComponent));
    });
    it('should create.', () => {
      expect(checkbox).toBeDefined();
    });
  });
  describe(`disabled.`, () => {
    let fixture: ComponentFixture<TestXCheckboxDisabledComponent>;
    let checkbox: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXCheckboxDisabledComponent);
      fixture.detectChanges();
      checkbox = fixture.debugElement.query(By.directive(XCheckboxComponent));
    });
    it('should create.', () => {
      expect(checkbox).toBeDefined();
    });
  });
  describe(`button.`, () => {
    let fixture: ComponentFixture<TestXCheckboxButtonComponent>;
    let checkbox: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXCheckboxButtonComponent);
      fixture.detectChanges();
      checkbox = fixture.debugElement.query(By.directive(XCheckboxComponent));
    });
    it('should create.', () => {
      expect(checkbox).toBeDefined();
    });
  });
  describe(`icon.`, () => {
    let fixture: ComponentFixture<TestXCheckboxIconComponent>;
    let checkbox: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXCheckboxIconComponent);
      fixture.detectChanges();
      checkbox = fixture.debugElement.query(By.directive(XCheckboxComponent));
    });
    it('should create.', () => {
      expect(checkbox).toBeDefined();
    });
  });
  describe(`async.`, () => {
    let fixture: ComponentFixture<TestXCheckboxAsyncComponent>;
    let checkbox: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXCheckboxAsyncComponent);
      fixture.detectChanges();
      checkbox = fixture.debugElement.query(By.directive(XCheckboxComponent));
    });
    it('should create.', () => {
      expect(checkbox).toBeDefined();
    });
  });
  describe(`indeterminate.`, () => {
    let fixture: ComponentFixture<TestXCheckboxIndeterminateComponent>;
    let checkbox: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXCheckboxIndeterminateComponent);
      fixture.detectChanges();
      checkbox = fixture.debugElement.query(By.directive(XCheckboxComponent));
    });
    it('should create.', () => {
      expect(checkbox).toBeDefined();
    });
  });
});

const data = ['QQ', '微信', '钉钉', '微博'];

const iconData: XData<XCheckboxNode> = [
  { label: 'QQ', icon: 'ado-qq' },
  { label: '微信', icon: 'ado-wechat' },
  { label: '钉钉', icon: 'ado-dingding' },
  { label: '微博', icon: 'ado-weibo' }
];

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row>
      <x-col span="24">
        <x-checkbox [data]="['一个选项']" [(ngModel)]="model1" (ngModelChange)="change($event)"></x-checkbox>
      </x-col>
      <x-col span="24">
        <x-checkbox [data]="data"></x-checkbox>
      </x-col>
      <x-col span="24">
        <x-checkbox [data]="data" [(ngModel)]="model" (ngModelChange)="change($event)"></x-checkbox>
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
class TestXCheckboxComponent {
  model1: boolean = true;
  data: XData<XCheckboxNode> = data;
  model = ['钉钉'];
  change(value: string[]) {
    console.log(value);
  }
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row>
      <x-col span="24">
        <x-checkbox [data]="data" disabled></x-checkbox>
      </x-col>
      <x-col span="24">
        <x-checkbox [data]="data" [(ngModel)]="model" disabled></x-checkbox>
      </x-col>
      <x-col span="24">
        <x-checkbox [data]="dataDisabled"></x-checkbox>
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
class TestXCheckboxDisabledComponent {
  data: XData<XCheckboxNode> = data;
  dataDisabled: XData<XCheckboxNode> = ['QQ', '微信', { label: '钉钉', disabled: true }, '微博'];
  model = ['钉钉'];
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row>
      <x-col span="24">
        <x-checkbox [data]="data" button></x-checkbox>
      </x-col>
      <x-col span="24">
        <x-checkbox [data]="data" [(ngModel)]="model" (ngModelChange)="change($event)" button></x-checkbox>
      </x-col>
      <x-col span="24">
        <x-checkbox [data]="data" button disabled></x-checkbox>
      </x-col>
      <x-col span="24">
        <x-checkbox [data]="data" [(ngModel)]="model" button disabled></x-checkbox>
      </x-col>
      <x-col span="24">
        <x-checkbox [data]="dataDisabled" button></x-checkbox>
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
class TestXCheckboxButtonComponent {
  constructor(public cdr: ChangeDetectorRef) {}
  data: XData<XCheckboxNode> = data;
  dataDisabled: XData<XCheckboxNode> = ['QQ', '微信', { label: '钉钉', disabled: true }, '微博'];
  model = ['钉钉'];
  change() {
    this.cdr.detectChanges();
  }
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row>
      <x-col span="24">
        <x-checkbox [data]="data" icon></x-checkbox>
      </x-col>
      <x-col span="24">
        <x-checkbox [data]="data" [(ngModel)]="model" (ngModelChange)="change($event)" icon></x-checkbox>
      </x-col>
      <x-col span="24">
        <x-checkbox [data]="data" icon disabled></x-checkbox>
      </x-col>
      <x-col span="24">
        <x-checkbox [data]="data" [(ngModel)]="model" icon disabled></x-checkbox>
      </x-col>
      <x-col span="24">
        <x-checkbox [data]="dataDisabled" icon></x-checkbox>
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
class TestXCheckboxIconComponent {
  constructor(public cdr: ChangeDetectorRef) {}
  data: XData<XCheckboxNode> = iconData;
  dataDisabled: XData<XCheckboxNode> = [
    { label: 'QQ', icon: 'ado-qq' },
    { label: '微信', icon: 'ado-wechat' },
    { label: '钉钉', disabled: true, icon: 'ado-dingding' },
    { label: '微博', icon: 'ado-weibo' }
  ];
  model = ['钉钉'];
  change(value: string[]) {
    console.log(value);
    this.cdr.detectChanges();
  }
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row>
      <x-col span="24">
        <x-button type="primary" [loading]="loading" (click)="getData()">请求</x-button>
      </x-col>
      <x-col span="24">
        <x-checkbox [data]="data"></x-checkbox>
      </x-col>
      <x-col span="24">
        <x-checkbox [data]="data" [(ngModel)]="model"></x-checkbox>
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
class TestXCheckboxAsyncComponent {
  constructor(public cdr: ChangeDetectorRef) {}
  data!: XData<XCheckboxNode>;
  model = ['钉钉'];
  loading = false;
  getData() {
    this.loading = true;
    this.data = new Observable((x) => {
      // 替换成http请求，或者data直接定义成 Observable 对象
      setTimeout(() => {
        this.model = ['微博'];
        this.loading = false;
        this.cdr.detectChanges();
        x.next(data);
        x.complete();
      }, 2000);
    });
    this.cdr.detectChanges();
  }
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row>
      <x-col span="24">
        <x-checkbox
          [data]="checkAllData"
          [(ngModel)]="checkAll"
          (ngModelChange)="change($event)"
          [indeterminate]="indeterminate"
        ></x-checkbox>
      </x-col>
      <x-col span="24">
        <x-checkbox [data]="data" [(ngModel)]="model" (ngModelChange)="itemChange($event)"></x-checkbox>
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
class TestXCheckboxIndeterminateComponent {
  constructor(public cdr: ChangeDetectorRef) {}
  checkAllData: XData<XCheckboxNode> = ['全选'];
  checkAll = false;
  indeterminate = true;
  data: string[] = ['QQ', '微信', '钉钉', '微博'];
  model: any = ['QQ'];
  change(value: boolean) {
    this.model = value ? this.data.map((x) => x) : [];
    this.indeterminate = false;
    this.cdr.detectChanges();
  }
  itemChange(value: string[]) {
    this.checkAll = value.length === this.data.length;
    this.indeterminate = value.length > 0 && value.length < this.data.length;
    this.cdr.detectChanges();
  }
}
