import { interval } from "rxjs";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { XCascadeComponent } from "./cascade.component";
import { Component, DebugElement, ChangeDetectorRef } from "@angular/core";
import { By } from "@angular/platform-browser";
import { XCascadeModule } from "./cascade.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { XCascadePrefix, XCascadeNode } from "./cascade.type";
import { XFenceModule } from "@ng-nest/ui/fence";

describe(XCascadePrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XCascadeModule, FormsModule, ReactiveFormsModule, XFenceModule],
      declarations: [
        TestXCascadeComponent,
        TestXCascadeLabelComponent,
        TestXCascadeDisabledComponent,
        TestXCascadeRequiredComponent
      ]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXCascadeComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXCascadeComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XCascadeComponent));
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`label.`, () => {
    let fixture: ComponentFixture<TestXCascadeLabelComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXCascadeLabelComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXCascadeLabelComponent));
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`disabled.`, () => {
    let fixture: ComponentFixture<TestXCascadeDisabledComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXCascadeDisabledComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXCascadeDisabledComponent));
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`required.`, () => {
    let fixture: ComponentFixture<TestXCascadeRequiredComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXCascadeRequiredComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXCascadeRequiredComponent));
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
});

const data: XCascadeNode[] = [
  { key: 1, label: "AAAA" },
  { key: 2, label: "BBBB" },
  { key: 3, label: "CCCC" },
  { key: 4, label: "DDDD" },
  { key: 5, label: "AAAA-1", parentKey: 1 },
  { key: 6, label: "AAAA-2", parentKey: 1 },
  { key: 7, label: "AAAA-3", parentKey: 1 },
  { key: 8, label: "AAAA-4", parentKey: 1 },
  { key: 9, label: "BBBB-1", parentKey: 2 },
  { key: 10, label: "BBBB-2", parentKey: 2 },
  { key: 11, label: "BBBB-3", parentKey: 2 },
  { key: 12, label: "BBBB-4", parentKey: 2 },
  { key: 13, label: "CCCC-1", parentKey: 3 },
  { key: 14, label: "CCCC-2", parentKey: 3 },
  { key: 15, label: "CCCC-3", parentKey: 3 },
  { key: 16, label: "CCCC-4", parentKey: 3 },
  { key: 17, label: "DDDD-1", parentKey: 4 },
  { key: 18, label: "DDDD-2", parentKey: 4 },
  { key: 19, label: "DDDD-3", parentKey: 4 },
  { key: 20, label: "DDDD-4", parentKey: 4 },
  { key: 21, label: "AAAA-1-1", parentKey: 5 },
  { key: 22, label: "AAAA-1-2", parentKey: 5 },
  { key: 23, label: "AAAA-1-3", parentKey: 5 },
  { key: 24, label: "AAAA-1-4", parentKey: 5 },
  { key: 25, label: "AAAA-2-1", parentKey: 6 },
  { key: 26, label: "AAAA-2-2", parentKey: 6 },
  { key: 27, label: "AAAA-2-3", parentKey: 6 },
  { key: 28, label: "AAAA-2-4", parentKey: 6 },
  { key: 29, label: "AAAA-3-1", parentKey: 7 },
  { key: 30, label: "AAAA-3-2", parentKey: 7 },
  { key: 31, label: "AAAA-3-3", parentKey: 7 },
  { key: 32, label: "AAAA-3-4", parentKey: 7 },
  { key: 33, label: "AAAA-4-1", parentKey: 8 },
  { key: 34, label: "AAAA-4-2", parentKey: 8 },
  { key: 35, label: "AAAA-4-3", parentKey: 8 },
  { key: 36, label: "AAAA-4-4", parentKey: 8 }
];

@Component({
  template: `
    <x-row>
      <x-col span="12">
        <x-cascade [data]="data" [(ngModel)]="model1" (nodeEmit)="change($event)"></x-cascade>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-cascade [data]="data" [(ngModel)]="model2" (nodeEmit)="change($event)"></x-cascade>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-cascade [data]="data" [(ngModel)]="model3" (nodeEmit)="change($event)"></x-cascade>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      :host {
        height: 900px;
      }
      x-row:not(:first-child) {
        margin-top: 0.5rem;
      }
    `
  ]
})
class TestXCascadeComponent {
  data = data;
  model1: any;
  model2 = 22;
  model3 = 10;
  constructor(private cdr: ChangeDetectorRef) {
    // interval(500).subscribe(x => {
    //   this.cdr.detectChanges();
    // });
  }
  change(val) {
    // this.cdr.detectChanges();
  }
}

@Component({
  template: `
    <x-row>
      <x-col span="12">
        <x-cascade label="方式" [data]="data" [(ngModel)]="model1" (nodeEmit)="change($event)"></x-cascade>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-cascade
          label="方式"
          [data]="data"
          [(ngModel)]="model2"
          (nodeEmit)="change($event)"
          direction="column-reverse"
        ></x-cascade>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-cascade
          label="方式"
          [data]="data"
          [(ngModel)]="model3"
          (nodeEmit)="change($event)"
          direction="row"
        ></x-cascade>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-cascade
          label="方式"
          [data]="data"
          [(ngModel)]="model4"
          (nodeEmit)="change($event)"
          direction="row-reverse"
        ></x-cascade>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      x-row:not(:first-child) {
        margin-top: 0.5rem;
      }
    `
  ]
})
class TestXCascadeLabelComponent {
  data = data;
  model1: any;
  model2: any;
  model3: any;
  model4: any;
  constructor(private cdr: ChangeDetectorRef) {}
  change(val) {
    this.cdr.detectChanges();
  }
}

@Component({
  template: `
    <x-row>
      <x-col span="12">
        <x-cascade [data]="data" disabled></x-cascade>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-cascade [data]="data" [(ngModel)]="model" disabled></x-cascade>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      x-row:not(:first-child) {
        margin-top: 0.5rem;
      }
    `
  ]
})
class TestXCascadeDisabledComponent {
  data = data;
  model = 22;
}

@Component({
  template: `
    <x-row>
      <x-col span="12">
        <x-cascade [data]="data" [(ngModel)]="model1" (nodeEmit)="change($event)" required></x-cascade>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-cascade [data]="data" [(ngModel)]="model2" (nodeEmit)="change($event)" label="选择" required></x-cascade>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      x-row:not(:first-child) {
        margin-top: 0.5rem;
      }
    `
  ]
})
class TestXCascadeRequiredComponent {
  data = data;
  model1: any;
  model2: any;
  constructor(private cdr: ChangeDetectorRef) {}
  change(val) {
    this.cdr.detectChanges();
  }
}
