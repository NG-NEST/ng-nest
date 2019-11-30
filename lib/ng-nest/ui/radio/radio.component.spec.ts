import { XButtonModule } from "@ng-nest/ui/button";
import { Observable } from "rxjs";
import { async, ComponentFixture, TestBed, fakeAsync, flush } from "@angular/core/testing";

import { XRadioComponent } from "./radio.component";
import { Component, DebugElement, ChangeDetectorRef } from "@angular/core";
import { By } from "@angular/platform-browser";
import { XFenceModule } from "@ng-nest/ui/fence";
import { XRadioModule } from "./radio.module";
import { FormsModule } from "@angular/forms";
import { XRadioPrefix, XRadioNode } from "./radio.type";
import { XData } from "@ng-nest/ui/core";

describe(XRadioPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, XRadioModule, XButtonModule, XFenceModule],
      declarations: [
        TestXRadioComponent,
        TestXRadioDisabledComponent,
        TestXRadioButtonComponent,
        TestXRadioIconComponent,
        TestXRadioAsyncComponent
      ]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXRadioComponent>;
    let radio: DebugElement;
    let testComponent: TestXRadioComponent;
    let element: HTMLElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXRadioComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      radio = fixture.debugElement.query(By.directive(XRadioComponent));
      element = radio.nativeElement;
    });
    it("should create.", () => {
      expect(radio).toBeDefined();
    });
  });
  describe(`disabled.`, () => {
    let fixture: ComponentFixture<TestXRadioDisabledComponent>;
    let radio: DebugElement;
    let testComponent: TestXRadioDisabledComponent;
    let element: HTMLElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXRadioDisabledComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      radio = fixture.debugElement.query(By.directive(XRadioComponent));
      element = radio.nativeElement;
    });
    it("should create.", () => {
      expect(radio).toBeDefined();
    });
  });
  describe(`button.`, () => {
    let fixture: ComponentFixture<TestXRadioButtonComponent>;
    let radio: DebugElement;
    let testComponent: TestXRadioButtonComponent;
    let element: HTMLElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXRadioButtonComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      radio = fixture.debugElement.query(By.directive(XRadioComponent));
      element = radio.nativeElement;
    });
    it("should create.", () => {
      expect(radio).toBeDefined();
    });
  });
  describe(`icon.`, () => {
    let fixture: ComponentFixture<TestXRadioIconComponent>;
    let radio: DebugElement;
    let testComponent: TestXRadioIconComponent;
    let element: HTMLElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXRadioIconComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      radio = fixture.debugElement.query(By.directive(XRadioComponent));
      element = radio.nativeElement;
    });
    it("should create.", () => {
      expect(radio).toBeDefined();
    });
  });
  describe(`async.`, () => {
    let fixture: ComponentFixture<TestXRadioAsyncComponent>;
    let radio: DebugElement;
    let testComponent: TestXRadioAsyncComponent;
    let element: HTMLElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXRadioAsyncComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      radio = fixture.debugElement.query(By.directive(XRadioComponent));
      element = radio.nativeElement;
    });
    it("should create.", () => {
      expect(radio).toBeDefined();
    });
  });
});

const data: XRadioNode[] = [
  { key: 1, label: "QQ" },
  { key: 2, label: "微信" },
  { key: 3, label: "钉钉" },
  { key: 4, label: "微博" }
];

const iconData: XRadioNode[] = [
  { key: 1, title: "QQ", icon: "ado-qq" },
  { key: 2, title: "微信", icon: "ado-wechat" },
  { key: 3, title: "钉钉", icon: "ado-dingding" },
  { key: 4, title: "微博", icon: "ado-weibo" }
];

@Component({
  template: `
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
      x-row > x-col:not(:first-child) {
        margin-top: 0.5rem;
      }
    `
  ]
})
class TestXRadioComponent {
  data: XData<XRadioNode[]> = data;
  model = 2;
}

@Component({
  template: `
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
      x-row > x-col:not(:first-child) {
        margin-top: 0.5rem;
      }
    `
  ]
})
class TestXRadioDisabledComponent {
  data: XData<XRadioNode[]> = data;
  dataDisabled: XData<XRadioNode[]> = data.map((x, i) => {
    let clone = Object.assign({}, x);
    if (i === 1) clone.disabled = true;
    return clone;
  });
  model = 2;
}

@Component({
  template: `
    <x-row>
      <x-col span="24">
        <x-radio [data]="data" button></x-radio>
      </x-col>
      <x-col span="24">
        <x-radio [data]="data" [(ngModel)]="model" (ngModelChange)="change($event)" button></x-radio>
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
      x-row > x-col:not(:first-child) {
        margin-top: 0.5rem;
      }
    `
  ]
})
class TestXRadioButtonComponent {
  constructor(public cdr: ChangeDetectorRef) {}
  data: XRadioNode[] = data;
  dataDisabled: XData<XRadioNode[]> = data.map((x, i) => {
    let clone = Object.assign({}, x);
    if (i === 1) clone.disabled = true;
    return clone;
  });
  model = 2;
  change($event) {
    this.cdr.detectChanges();
  }
}

@Component({
  template: `
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
      x-row > x-col:not(:first-child) {
        margin-top: 0.5rem;
      }
    `
  ]
})
class TestXRadioIconComponent {
  data: XRadioNode[] = iconData;
  dataDisabled: XData<XRadioNode[]> = iconData.map((x, i) => {
    let clone = Object.assign({}, x);
    if (i === 1) clone.disabled = true;
    return clone;
  });
  model = 2;
}

@Component({
  template: `
    <x-row>
      <x-col span="24">
        <x-button label="请求" type="primary" [loading]="loading" (click)="getData()"></x-button>
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
      x-row > x-col:not(:first-child) {
        margin-top: 0.5rem;
      }
    `
  ]
})
class TestXRadioAsyncComponent {
  constructor(public cdr: ChangeDetectorRef) {}
  data: XData<XRadioNode[]>;
  model = 2;
  loading = false;
  getData() {
    this.loading = true;
    this.data = Observable.create(x => {
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
