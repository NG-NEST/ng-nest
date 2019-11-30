import { XButtonModule } from "@ng-nest/ui/button";
import { Observable } from "rxjs";
import { async, ComponentFixture, TestBed, fakeAsync, flush } from "@angular/core/testing";

import { XCheckboxComponent } from "./checkbox.component";
import { Component, DebugElement, ChangeDetectorRef } from "@angular/core";
import { By } from "@angular/platform-browser";
import { XFenceModule } from "@ng-nest/ui/fence";
import { XCheckboxModule } from "./checkbox.module";
import { FormsModule } from "@angular/forms";
import { XCheckboxPrefix, XCheckboxNode } from "./checkbox.type";
import { XData } from "@ng-nest/ui/core";

describe(XCheckboxPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, XCheckboxModule, XButtonModule, XFenceModule],
      declarations: [
        TestXCheckboxComponent,
        TestXCheckboxDisabledComponent,
        TestXCheckboxButtonComponent,
        TestXCheckboxIconComponent,
        TestXCheckboxAsyncComponent,
        TestXCheckboxIndeterminateComponent
      ]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXCheckboxComponent>;
    let checkbox: DebugElement;
    let testComponent: TestXCheckboxComponent;
    let element: HTMLElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXCheckboxComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      checkbox = fixture.debugElement.query(By.directive(XCheckboxComponent));
      element = checkbox.nativeElement;
    });
    it("should create.", () => {
      expect(checkbox).toBeDefined();
    });
  });
  describe(`disabled.`, () => {
    let fixture: ComponentFixture<TestXCheckboxDisabledComponent>;
    let checkbox: DebugElement;
    let testComponent: TestXCheckboxDisabledComponent;
    let element: HTMLElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXCheckboxDisabledComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      checkbox = fixture.debugElement.query(By.directive(XCheckboxComponent));
      element = checkbox.nativeElement;
    });
    it("should create.", () => {
      expect(checkbox).toBeDefined();
    });
  });
  describe(`button.`, () => {
    let fixture: ComponentFixture<TestXCheckboxButtonComponent>;
    let checkbox: DebugElement;
    let testComponent: TestXCheckboxButtonComponent;
    let element: HTMLElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXCheckboxButtonComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      checkbox = fixture.debugElement.query(By.directive(XCheckboxComponent));
      element = checkbox.nativeElement;
    });
    it("should create.", () => {
      expect(checkbox).toBeDefined();
    });
  });
  describe(`icon.`, () => {
    let fixture: ComponentFixture<TestXCheckboxIconComponent>;
    let checkbox: DebugElement;
    let testComponent: TestXCheckboxIconComponent;
    let element: HTMLElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXCheckboxIconComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      checkbox = fixture.debugElement.query(By.directive(XCheckboxComponent));
      element = checkbox.nativeElement;
    });
    it("should create.", () => {
      expect(checkbox).toBeDefined();
    });
  });
  describe(`async.`, () => {
    let fixture: ComponentFixture<TestXCheckboxAsyncComponent>;
    let checkbox: DebugElement;
    let testComponent: TestXCheckboxAsyncComponent;
    let element: HTMLElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXCheckboxAsyncComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      checkbox = fixture.debugElement.query(By.directive(XCheckboxComponent));
      element = checkbox.nativeElement;
    });
    it("should create.", () => {
      expect(checkbox).toBeDefined();
    });
  });
  describe(`indeterminate.`, () => {
    let fixture: ComponentFixture<TestXCheckboxIndeterminateComponent>;
    let checkbox: DebugElement;
    let testComponent: TestXCheckboxIndeterminateComponent;
    let element: HTMLElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXCheckboxIndeterminateComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      checkbox = fixture.debugElement.query(By.directive(XCheckboxComponent));
      element = checkbox.nativeElement;
    });
    it("should create.", () => {
      expect(checkbox).toBeDefined();
    });
  });
});

const data: XCheckboxNode[] = [
  { key: 1, label: "QQ" },
  { key: 2, label: "微信" },
  { key: 3, label: "钉钉" },
  { key: 4, label: "微博" }
];

const iconData: XCheckboxNode[] = [
  { key: 1, title: "QQ", icon: "ado-qq" },
  { key: 2, title: "微信", icon: "ado-wechat" },
  { key: 3, title: "钉钉", icon: "ado-dingding" },
  { key: 4, title: "微博", icon: "ado-weibo" }
];

@Component({
  template: `
    <x-row>
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
      x-row > x-col:not(:first-child) {
        margin-top: 0.5rem;
      }
    `
  ]
})
class TestXCheckboxComponent {
  data: XData<XCheckboxNode[]> = data;
  model = [2];
  change(value) {
    console.log(value);
  }
}

@Component({
  template: `
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
      x-row > x-col:not(:first-child) {
        margin-top: 0.5rem;
      }
    `
  ]
})
class TestXCheckboxDisabledComponent {
  data: XData<XCheckboxNode[]> = data;
  dataDisabled: XData<XCheckboxNode[]> = data.map((x, i) => {
    let clone = Object.assign({}, x);
    if (i === 1) clone.disabled = true;
    return clone;
  });
  model = [2];
}

@Component({
  template: `
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
      x-row > x-col:not(:first-child) {
        margin-top: 0.5rem;
      }
    `
  ]
})
class TestXCheckboxButtonComponent {
  constructor(public cdr: ChangeDetectorRef) {}
  data: XCheckboxNode[] = data;
  dataDisabled: XData<XCheckboxNode[]> = data.map((x, i) => {
    let clone = Object.assign({}, x);
    if (i === 1) clone.disabled = true;
    return clone;
  });
  model = [2];
  change($event) {
    this.cdr.detectChanges();
  }
}

@Component({
  template: `
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
      x-row > x-col:not(:first-child) {
        margin-top: 0.5rem;
      }
    `
  ]
})
class TestXCheckboxIconComponent {
  constructor(public cdr: ChangeDetectorRef) {}
  data: XCheckboxNode[] = iconData;
  dataDisabled: XData<XCheckboxNode[]> = iconData.map((x, i) => {
    let clone = Object.assign({}, x);
    if (i === 1) clone.disabled = true;
    return clone;
  });
  model = [2];
  change($event) {
    this.cdr.detectChanges();
  }
}

@Component({
  template: `
    <x-row>
      <x-col span="24">
        <x-button label="请求" type="primary" [loading]="loading" (click)="getData()"></x-button>
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
      x-row > x-col:not(:first-child) {
        margin-top: 0.5rem;
      }
    `
  ]
})
class TestXCheckboxAsyncComponent {
  constructor(public cdr: ChangeDetectorRef) {}
  data: XData<XCheckboxNode[]>;
  model = [2];
  loading = false;
  getData() {
    this.loading = true;
    this.data = Observable.create(x => {
      // 替换成http请求，或者data直接定义成 Observable 对象
      setTimeout(() => {
        this.model = [3];
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
      x-row > x-col:not(:first-child) {
        margin-top: 0.5rem;
      }
    `
  ]
})
class TestXCheckboxIndeterminateComponent {
  constructor(public cdr: ChangeDetectorRef) {}
  checkAllData: XData<XCheckboxNode[]> = [{ key: true, label: "全选" }];
  checkAll = [false];
  indeterminate = true;
  data: XCheckboxNode[] = data;
  model: any = [1, 2];
  change(value) {
    this.model = value.indexOf(true) >= 0 ? data.map(x => x.key) : [];
    this.indeterminate = false;
    this.cdr.detectChanges();
  }
  itemChange(value) {
    this.checkAll = [value.length === data.length];
    this.indeterminate = value.length > 0 && value.length < data.length;
    this.cdr.detectChanges();
  }
}
