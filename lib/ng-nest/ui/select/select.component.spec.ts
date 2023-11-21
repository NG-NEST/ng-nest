import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XSelectComponent } from './select.component';
import { Component, DebugElement, ChangeDetectorRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XSelectModule } from '@ng-nest/ui/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XSelectPrefix, XSelectNode } from './select.property';
import { XRowComponent, XColComponent } from '@ng-nest/ui/layout';
import { Observable, interval } from 'rxjs';
import { XData } from '@ng-nest/ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XThemeModule } from '@ng-nest/ui/theme';
import { XRadioModule } from '@ng-nest/ui/radio';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe(XSelectPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        XThemeModule,
        XSelectModule,
        FormsModule,
        ReactiveFormsModule,
        XRowComponent,
        XColComponent,
        XRadioModule
      ],
      declarations: [
        TestXSelectComponent,
        TestXSelectAsyncComponent,
        TestXSelectLabelComponent,
        TestXSelectDisabledComponent,
        TestXSelectRequiredComponent,
        TestXSelectMultipleComponent,
        TestXSelectCustomNodeComponent,
        TestXSelectBorderedComponent,
        TestXSelectSizeComponent
      ]
    }).compileComponents();
  });
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXSelectComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXSelectComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XSelectComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`async.`, () => {
    let fixture: ComponentFixture<TestXSelectAsyncComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXSelectAsyncComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XSelectComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`label.`, () => {
    let fixture: ComponentFixture<TestXSelectLabelComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXSelectLabelComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XSelectComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`disabled.`, () => {
    let fixture: ComponentFixture<TestXSelectDisabledComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXSelectDisabledComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XSelectComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`required.`, () => {
    let fixture: ComponentFixture<TestXSelectRequiredComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXSelectRequiredComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XSelectComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`multiple.`, () => {
    let fixture: ComponentFixture<TestXSelectMultipleComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXSelectMultipleComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XSelectComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`custom.`, () => {
    let fixture: ComponentFixture<TestXSelectCustomNodeComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXSelectCustomNodeComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XSelectComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`size.`, () => {
    let fixture: ComponentFixture<TestXSelectSizeComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXSelectSizeComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XSelectComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`bordered.`, () => {
    let fixture: ComponentFixture<TestXSelectBorderedComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXSelectBorderedComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XSelectComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
});

const data: XData<XSelectNode> = [
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
        <x-select [data]="data1" [(ngModel)]="model1"></x-select>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="8">
        <x-select [data]="data2" [(ngModel)]="model2"></x-select>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      :host {
        height: 900px;
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
class TestXSelectComponent {
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
        <x-select label="方式" [data]="data" [(ngModel)]="model"></x-select>
      </x-col>
    </x-row>
    <x-row>
      <x-col>
        <x-select
          label="方式"
          [data]="data"
          [(ngModel)]="model"
          direction="column-reverse"
        ></x-select>
      </x-col>
    </x-row>
    <x-row>
      <x-col>
        <x-select label="方式" [data]="data" [(ngModel)]="model" direction="row"></x-select>
      </x-col>
    </x-row>
    <x-row>
      <x-col>
        <x-select label="方式" [data]="data" [(ngModel)]="model" direction="row-reverse"></x-select>
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
class TestXSelectLabelComponent {
  data = data;
  model: any;
  constructor(public cdr: ChangeDetectorRef) {}
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row>
      <x-col>
        <x-select [data]="data" disabled></x-select>
      </x-col>
    </x-row>
    <x-row>
      <x-col>
        <x-select [data]="data" [(ngModel)]="model" disabled></x-select>
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
class TestXSelectDisabledComponent {
  data = data;
  model = 'DDDD';
  constructor(public cdr: ChangeDetectorRef) {}
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row>
      <x-col>
        <x-select [data]="data" [(ngModel)]="model1" required></x-select>
      </x-col>
    </x-row>
    <x-row>
      <x-col>
        <x-select [data]="data" [(ngModel)]="model2" label="选择" required></x-select>
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
class TestXSelectRequiredComponent {
  data = data;
  model1: any;
  model2: any;
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row>
      <x-col>
        <x-select [data]="data" [(ngModel)]="model" (ngModelChange)="change()" async></x-select>
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
class TestXSelectAsyncComponent {
  model = 'QQ';
  data = new Observable<string[]>((x) => {
    // 替换成http请求，或者data直接定义成 Observable 对象
    setTimeout(() => {
      this.model = '钉钉';
      x.next(['QQ', '微信', '钉钉', '微博']);
      x.complete();
    }, 2000);
  });
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
        <x-select [data]="data1" [(ngModel)]="model1" multiple></x-select>
      </x-col>
      <x-col span="8">
        <x-select [data]="data2" [(ngModel)]="model2" multiple></x-select>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      :host {
        height: 900px;
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
class TestXSelectMultipleComponent {
  data1 = data;
  model1: any;
  data2 = JSON.parse(JSON.stringify(data));
  model2 = [
    { id: 'AAAA', label: 'AAAA' },
    { id: 'BBBB', label: 'BBBB' }
  ];
  constructor(public cdr: ChangeDetectorRef) {
    interval(0).subscribe(() => this.cdr.detectChanges());
  }
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row>
      <x-col span="8">
        <x-select
          [data]="data1"
          [(ngModel)]="model1"
          (ngModelChange)="change($event)"
          [nodeTpl]="nodeTpl"
        ></x-select>
      </x-col>
      <ng-template #nodeTpl let-node="$node">
        <span *ngIf="node" class="select-item"> {{ node?.label }}<sup>2</sup> </span>
      </ng-template>
      <x-col span="8">
        <x-select
          [data]="data2"
          [(ngModel)]="model2"
          (ngModelChange)="change($event)"
          [nodeTpl]="multipleNodeTpl"
          multiple
        ></x-select>
      </x-col>
      <ng-template #multipleNodeTpl let-node="$node" let-isValue="$isValue">
        <span *ngIf="node && !isValue" class="select-item"> {{ node?.label }} <sup>2</sup> </span>
        <span *ngIf="node && isValue">
          <span class="select-item" *ngFor="let item of node"> {{ item.label }} <sup>2</sup> </span>
        </span>
      </ng-template>
    </x-row>
  `,
  styles: [
    `
      :host {
        height: 900px;
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      x-row:not(:first-child) {
        margin-top: 1rem;
      }
      .select-item {
        line-height: 1.25rem;
      }
      .select-item:not(:first-child):before {
        content: ',';
      }
    `
  ]
})
class TestXSelectCustomNodeComponent {
  data1 = data;
  model1: any;
  data2 = JSON.parse(JSON.stringify(data));
  model2: any;
  constructor(public cdr: ChangeDetectorRef) {
    interval(0).subscribe(() => {
      this.cdr.detectChanges();
    });
  }

  change(value: any) {
    console.log(value);
  }
}

@Component({
  template: `
    <x-radio [data]="radioData" [(ngModel)]="size" (ngModelChange)="change($event)"></x-radio>
    <x-row>
      <x-col span="24">
        <x-select [size]="size" [data]="data"></x-select>
      </x-col>
      <x-col span="24">
        <x-select
          [size]="size"
          [data]="data"
          label="用户名"
          direction="row"
          maxlength="50"
        ></x-select>
      </x-col>
      <x-col span="24">
        <x-select
          [size]="size"
          [data]="data"
          label="用户名"
          direction="column"
          maxlength="50"
        ></x-select>
      </x-col>
      <x-col span="24">
        <x-select
          [size]="size"
          [data]="data"
          icon="ado-user"
          iconLayout="left"
          maxlength="50"
        ></x-select>
      </x-col>
      <x-col span="24">
        <x-select required clearable [size]="size" [data]="data"></x-select>
      </x-col>
      <x-col span="24">
        <x-select disabled [size]="size" [data]="data"></x-select>
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
      x-row > x-col > x-select {
        width: 15rem;
        display: block;
      }
      x-row > x-col:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXSelectSizeComponent {
  radioData = ['big', 'large', 'medium', 'small', 'mini'];
  size = 'medium';
  data = data;
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
        <x-select [data]="data" placeholder="请选择" bordered="false"></x-select>
      </x-col>
      <x-col span="24">
        <x-select
          [data]="data"
          placeholder="请选择"
          bordered="false"
          label="日生:"
          direction="row"
        ></x-select>
      </x-col>
      <x-col span="24">
        <x-select [data]="data" placeholder="请选择" bordered="false"></x-select>
      </x-col>
      <x-col span="24">
        <x-select [data]="data" placeholder="请选择" bordered="false" required></x-select>
      </x-col>
      <x-col span="24">
        <x-select [data]="data" placeholder="没有边框" bordered="false" disabled></x-select>
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
      x-row > x-col > x-select {
        width: 15rem;
        display: block;
      }
      x-row > x-col:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXSelectBorderedComponent {
  data = data;
  constructor() {}
}
