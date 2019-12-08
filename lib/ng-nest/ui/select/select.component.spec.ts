import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { XSelectComponent } from "./select.component";
import { Component, DebugElement, ChangeDetectorRef } from "@angular/core";
import { By } from "@angular/platform-browser";
import { XSelectModule } from "./select.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { XSelectPrefix, XSelectNode } from "./select.type";
import { XFenceModule } from "@ng-nest/ui/fence";
import { Observable } from "rxjs";

describe(XSelectPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XSelectModule, FormsModule, ReactiveFormsModule, XFenceModule],
      declarations: [
        TestXSelectComponent,
        TestXSelectAsyncComponent,
        TestXSelectLabelComponent,
        TestXSelectDisabledComponent,
        TestXSelectRequiredComponent
      ]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXSelectComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXSelectComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XSelectComponent));
    });
    it("should create.", () => {
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
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`label.`, () => {
    let fixture: ComponentFixture<TestXSelectLabelComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXSelectLabelComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXSelectLabelComponent));
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`disabled.`, () => {
    let fixture: ComponentFixture<TestXSelectDisabledComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXSelectDisabledComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXSelectDisabledComponent));
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`required.`, () => {
    let fixture: ComponentFixture<TestXSelectRequiredComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXSelectRequiredComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXSelectRequiredComponent));
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
});

const data: XSelectNode[] = [
  { key: 1, label: "QQ" },
  { key: 2, label: "微信" },
  { key: 3, label: "钉钉" },
  { key: 4, label: "微博" }
];

@Component({
  template: `
    <x-row>
      <x-col>
        <x-select [data]="data"></x-select>
      </x-col>
    </x-row>
    <x-row>
      <x-col>
        <x-select [data]="data" [(ngModel)]="model"></x-select>
      </x-col>
    </x-row>
    <x-row>
      <x-col>
        <x-select [data]="data2" [(ngModel)]="model"></x-select>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      :host {
        height: 900px;
      }
      x-row > x-col {
        width: 10rem;
      }
      x-row:not(:first-child) {
        margin-top: 0.5rem;
      }
    `
  ]
})
class TestXSelectComponent {
  data = data;
  data2 = [
    { key: 1, label: "AA" },
    { key: 2, label: "BB" },
    { key: 3, label: "CC" },
    { key: 4, label: "DD" },
    { key: 5, label: "EE" },
    { key: 6, label: "FF" },
    { key: 7, label: "GG" },
    { key: 8, label: "HH" },
    { key: 9, label: "II" },
    { key: 10, label: "JJ" }
  ];
  model = 2;
}

@Component({
  template: `
    <x-row>
      <x-col>
        <x-select label="方式" [data]="data" [(ngModel)]="model" (ngModelChange)="change($event)"></x-select>
      </x-col>
    </x-row>
    <x-row>
      <x-col>
        <x-select
          label="方式"
          [data]="data"
          [(ngModel)]="model"
          (ngModelChange)="change($event)"
          direction="column-reverse"
        ></x-select>
      </x-col>
    </x-row>
    <x-row>
      <x-col>
        <x-select
          label="方式"
          [data]="data"
          [(ngModel)]="model"
          (ngModelChange)="change($event)"
          direction="row"
        ></x-select>
      </x-col>
    </x-row>
    <x-row>
      <x-col>
        <x-select
          label="方式"
          [data]="data"
          [(ngModel)]="model"
          (ngModelChange)="change($event)"
          direction="row-reverse"
        ></x-select>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      x-row > x-col {
        width: 10rem;
      }
      x-row:not(:first-child) {
        margin-top: 0.5rem;
      }
    `
  ]
})
class TestXSelectLabelComponent {
  data = data;
  model: any;
  constructor(private cdr: ChangeDetectorRef) {}
  change(val) {
    this.cdr.detectChanges();
  }
}

@Component({
  template: `
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
      x-row > x-col {
        width: 10rem;
      }
      x-row:not(:first-child) {
        margin-top: 0.5rem;
      }
    `
  ]
})
class TestXSelectDisabledComponent {
  data = data;
  model = 2;
}

@Component({
  template: `
    <x-row>
      <x-col>
        <x-select [data]="data" [(ngModel)]="model1" (ngModelChange)="change($event)" required></x-select>
      </x-col>
    </x-row>
    <x-row>
      <x-col>
        <x-select [data]="data" [(ngModel)]="model2" (ngModelChange)="change($event)" label="选择" required></x-select>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      x-row > x-col {
        width: 10rem;
      }
      x-row:not(:first-child) {
        margin-top: 0.5rem;
      }
    `
  ]
})
class TestXSelectRequiredComponent {
  data = data;
  model1: any;
  model2: any;
  constructor(private cdr: ChangeDetectorRef) {}
  change(val) {
    this.cdr.detectChanges();
  }
}

@Component({
  template: `
    <x-row>
      <x-col>
        <x-select [data]="data" [(ngModel)]="model" (ngModelChange)="change($event)" async></x-select>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      x-row > x-col {
        width: 10rem;
      }
      x-row:not(:first-child) {
        margin-top: 0.5rem;
      }
    `
  ]
})
class TestXSelectAsyncComponent {
  model: any;
  data = Observable.create(x => {
    // 替换成http请求，或者data直接定义成 Observable 对象
    setTimeout(() => {
      this.model = 3;
      x.next([
        { key: 1, label: "QQ" },
        { key: 2, label: "微信" },
        { key: 3, label: "钉钉" },
        { key: 4, label: "微博" }
      ]);
      x.complete();
    }, 2000);
  });
  constructor(private cdr: ChangeDetectorRef) {}
  change(val) {
    this.cdr.detectChanges();
  }
}
