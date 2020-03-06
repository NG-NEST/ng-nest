import { XButtonModule } from '@ng-nest/ui/button';
import { Observable } from 'rxjs';
import { async, ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';

import { XCheckboxComponent } from './checkbox.component';
import { Component, DebugElement, ChangeDetectorRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XFenceModule } from '@ng-nest/ui/fence';
import { XCheckboxModule } from './checkbox.module';
import { FormsModule } from '@angular/forms';
import { XCheckboxPrefix, XCheckboxNode } from './checkbox.type';
import { XData } from '@ng-nest/ui/core';

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
    it('should create.', () => {
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
    it('should create.', () => {
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
    it('should create.', () => {
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
    it('should create.', () => {
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
    it('should create.', () => {
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
    it('should create.', () => {
      expect(checkbox).toBeDefined();
    });
  });
});

const data: XData<XCheckboxNode[]> = ['QQ', '微信', '钉钉', '微博'];

const iconData: XData<XCheckboxNode[]> = [
  { label: 'QQ', icon: 'ado-qq' },
  { label: '微信', icon: 'ado-wechat' },
  { label: '钉钉', icon: 'ado-dingding' },
  { label: '微博', icon: 'ado-weibo' }
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
  model = ['钉钉'];
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
  dataDisabled: XData<XCheckboxNode[]> = ['QQ', '微信', { label: '钉钉', disabled: true }, '微博'];
  model = ['钉钉'];
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
  data: XData<XCheckboxNode[]> = data;
  dataDisabled: XData<XCheckboxNode[]> = ['QQ', '微信', { label: '钉钉', disabled: true }, '微博'];
  model = ['钉钉'];
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
  data: XData<XCheckboxNode[]> = iconData;
  dataDisabled: XData<XCheckboxNode[]> = [
    { label: 'QQ', icon: 'ado-qq' },
    { label: '微信', icon: 'ado-wechat' },
    { label: '钉钉', disabled: true, icon: 'ado-dingding' },
    { label: '微博', icon: 'ado-weibo' }
  ];
  model = ['钉钉'];
  change($event) {
    this.cdr.detectChanges();
  }
}

@Component({
  template: `
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
      x-row > x-col:not(:first-child) {
        margin-top: 0.5rem;
      }
    `
  ]
})
class TestXCheckboxAsyncComponent {
  constructor(public cdr: ChangeDetectorRef) {}
  data: XData<XCheckboxNode[]>;
  model = ['钉钉'];
  loading = false;
  getData() {
    this.loading = true;
    this.data = Observable.create(x => {
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
  checkAllData: XData<XCheckboxNode[]> = [{ id: true, label: '全选' }];
  checkAll = [false];
  indeterminate = true;
  data: XData<XCheckboxNode[]> = ['QQ', '微信', '钉钉', '微博'];
  model: any = ['QQ'];
  change(value) {
    this.model = value.indexOf(true) >= 0 ? (this.data as Array<any>).map(x => x) : [];
    this.indeterminate = false;
  }
  itemChange(value) {
    this.checkAll = [value.length === (this.data as Array<any>).length];
    this.indeterminate = value.length > 0 && value.length < (this.data as Array<any>).length;
  }
}
