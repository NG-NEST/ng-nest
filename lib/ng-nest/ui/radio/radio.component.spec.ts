import { XButtonComponent } from '@ng-nest/ui/button';
import { Observable } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XRadioComponent } from './radio.component';
import { Component, DebugElement, ChangeDetectorRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XRowComponent, XColComponent } from '@ng-nest/ui/layout';
import { XRadioModule } from '@ng-nest/ui/radio';
import { FormsModule } from '@angular/forms';
import { XRadioPrefix, XRadioNode } from './radio.property';
import { XData } from '@ng-nest/ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XThemeModule } from '@ng-nest/ui/theme';
import { XSelectModule } from '@ng-nest/ui/select';
import { XDatePickerComponent } from '@ng-nest/ui/date-picker';
import { XAutoCompleteComponent } from '@ng-nest/ui/auto-complete';
import { XCascadeComponent } from '@ng-nest/ui/cascade';
import { XColorPickerComponent } from '@ng-nest/ui/color-picker';
import { XFindComponent } from '@ng-nest/ui/find';
import { XTextareaModule } from '@ng-nest/ui/textarea';
import { XTimePickerModule } from '@ng-nest/ui/time-picker';
import { XInputComponent } from '@ng-nest/ui/input';
import { XTagModule } from '@ng-nest/ui/tag';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe(XRadioPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        XThemeModule,
        FormsModule,
        XRadioModule,
        XAutoCompleteComponent,
        XSelectModule,
        XDatePickerComponent,
        XButtonComponent,
        XRowComponent,
        XColComponent,
        XCascadeComponent,
        XColorPickerComponent,
        XFindComponent,
        XTextareaModule,
        XTimePickerModule,
        XInputComponent,
        XTagModule
      ],
      declarations: [
        TestXRadioComponent,
        TestXRadioDisabledComponent,
        TestXRadioButtonComponent,
        TestXRadioIconComponent,
        TestXRadioAsyncComponent
      ]
    }).compileComponents();
  });
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXRadioComponent>;
    let radio: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXRadioComponent);
      fixture.detectChanges();
      radio = fixture.debugElement.query(By.directive(XRadioComponent));
    });
    it('should create.', () => {
      expect(radio).toBeDefined();
    });
  });
  describe(`disabled.`, () => {
    let fixture: ComponentFixture<TestXRadioDisabledComponent>;
    let radio: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXRadioDisabledComponent);
      fixture.detectChanges();
      radio = fixture.debugElement.query(By.directive(XRadioComponent));
    });
    it('should create.', () => {
      expect(radio).toBeDefined();
    });
  });
  describe(`button.`, () => {
    let fixture: ComponentFixture<TestXRadioButtonComponent>;
    let radio: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXRadioButtonComponent);
      fixture.detectChanges();
      radio = fixture.debugElement.query(By.directive(XRadioComponent));
    });
    it('should create.', () => {
      expect(radio).toBeDefined();
    });
  });
  describe(`icon.`, () => {
    let fixture: ComponentFixture<TestXRadioIconComponent>;
    let radio: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXRadioIconComponent);
      fixture.detectChanges();
      radio = fixture.debugElement.query(By.directive(XRadioComponent));
    });
    it('should create.', () => {
      expect(radio).toBeDefined();
    });
  });
  describe(`async.`, () => {
    let fixture: ComponentFixture<TestXRadioAsyncComponent>;
    let radio: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXRadioAsyncComponent);
      fixture.detectChanges();
      radio = fixture.debugElement.query(By.directive(XRadioComponent));
    });
    it('should create.', () => {
      expect(radio).toBeDefined();
    });
  });
});

const data: string[] = ['QQ', '微信', '钉钉', '微博'];

const iconData: XData<XRadioNode> = [
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
        <x-radio [data]="data"></x-radio>
      </x-col>
      <x-col span="24">
        <x-radio [data]="data" [(ngModel)]="model"></x-radio>
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
class TestXRadioComponent {
  data: XData<XRadioNode> = data;
  model = 'QQ';
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row>
      <x-col span="24">
        <x-radio [data]="data" disabled></x-radio>
      </x-col>
      <x-col span="24">
        <x-radio [data]="data" [(ngModel)]="model" disabled></x-radio>
      </x-col>
      <x-col span="24">
        <x-radio [data]="dataDisabled"></x-radio>
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
class TestXRadioDisabledComponent {
  data: XData<XRadioNode> = data;
  dataDisabled: XData<XRadioNode> = ['QQ', '微信', { label: '钉钉', disabled: true }, '微博'];
  model = '钉钉';
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row>
      <x-col span="24">
        <x-radio [data]="data" button></x-radio>
      </x-col>
      <x-col span="24">
        <x-radio [data]="data" [(ngModel)]="model" button></x-radio>
      </x-col>
      <x-col span="24">
        <x-radio [data]="data" button disabled></x-radio>
      </x-col>
      <x-col span="24">
        <x-radio [data]="data" [(ngModel)]="model" button disabled></x-radio>
      </x-col>
      <x-col span="24">
        <x-radio [data]="dataDisabled" button></x-radio>
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
class TestXRadioButtonComponent {
  data: XData<XRadioNode> = data;
  dataDisabled: XData<XRadioNode> = ['QQ', '微信', { label: '钉钉', disabled: true }, '微博'];
  model = '钉钉';
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row>
      <x-col span="24">
        <x-radio [data]="data" icon></x-radio>
      </x-col>
      <x-col span="24">
        <x-radio [data]="data" [(ngModel)]="model" icon></x-radio>
      </x-col>
      <x-col span="24">
        <x-radio [data]="data" icon disabled></x-radio>
      </x-col>
      <x-col span="24">
        <x-radio [data]="data" [(ngModel)]="model" icon disabled></x-radio>
      </x-col>
      <x-col span="24">
        <x-radio [data]="dataDisabled" icon></x-radio>
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
class TestXRadioIconComponent {
  data: XData<XRadioNode> = iconData;
  dataDisabled: XData<XRadioNode> = [
    { label: 'QQ', icon: 'ado-qq' },
    { label: '微信', icon: 'ado-wechat' },
    { label: '钉钉', disabled: true, icon: 'ado-dingding' },
    { label: '微博', icon: 'ado-weibo' }
  ];
  model = '钉钉';
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row>
      <x-col span="24">
        <x-button type="primary" [loading]="loading" (click)="getData()">请求</x-button>
      </x-col>
      <x-col span="24">
        <x-radio [data]="data"></x-radio>
      </x-col>
      <x-col span="24">
        <x-radio [data]="data" [(ngModel)]="model"></x-radio>
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
class TestXRadioAsyncComponent {
  constructor(public cdr: ChangeDetectorRef) {}
  data!: XData<XRadioNode>;
  model = 2;
  loading = false;
  getData() {
    this.loading = true;
    this.data = new Observable((x) => {
      // 替换成http请求，或者data直接定义成 Observable 对象
      setTimeout(() => {
        this.model = 3;
        this.loading = false;
        this.cdr.detectChanges();
        x.next(data);
        x.complete();
      }, 2000);
    });
    this.cdr.detectChanges();
  }
}
