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
  { value: 1, label: "AAAA" },
  { value: 2, label: "BBBB" },
  { value: 3, label: "CCCC" },
  { value: 4, label: "DDDD" },
  { value: 5, label: "AAAA-1", parentValue: 1 },
  { value: 6, label: "AAAA-2", parentValue: 1 },
  { value: 7, label: "AAAA-3", parentValue: 1 },
  { value: 8, label: "AAAA-4", parentValue: 1 },
  { value: 9, label: "BBBB-1", parentValue: 2 },
  { value: 10, label: "BBBB-2", parentValue: 2 },
  { value: 11, label: "BBBB-3", parentValue: 2 },
  { value: 12, label: "BBBB-4", parentValue: 2 },
  { value: 13, label: "CCCC-1", parentValue: 3 },
  { value: 14, label: "CCCC-2", parentValue: 3 },
  { value: 15, label: "CCCC-3", parentValue: 3 },
  { value: 16, label: "CCCC-4", parentValue: 3 },
  { value: 17, label: "DDDD-1", parentValue: 4 },
  { value: 18, label: "DDDD-2", parentValue: 4 },
  { value: 19, label: "DDDD-3", parentValue: 4 },
  { value: 20, label: "DDDD-4", parentValue: 4 },
  { value: 21, label: "AAAA-1-1", parentValue: 5 },
  { value: 22, label: "AAAA-1-2", parentValue: 5 },
  { value: 23, label: "AAAA-1-3", parentValue: 5 },
  { value: 24, label: "AAAA-1-4", parentValue: 5 },
  { value: 25, label: "AAAA-2-1", parentValue: 6 },
  { value: 26, label: "AAAA-2-2", parentValue: 6 },
  { value: 27, label: "AAAA-2-3", parentValue: 6 },
  { value: 28, label: "AAAA-2-4", parentValue: 6 },
  { value: 29, label: "AAAA-3-1", parentValue: 7 },
  { value: 30, label: "AAAA-3-2", parentValue: 7 },
  { value: 31, label: "AAAA-3-3", parentValue: 7 },
  { value: 32, label: "AAAA-3-4", parentValue: 7 },
  { value: 33, label: "AAAA-4-1", parentValue: 8 },
  { value: 34, label: "AAAA-4-2", parentValue: 8 },
  { value: 35, label: "AAAA-4-3", parentValue: 8 },
  { value: 36, label: "AAAA-4-4", parentValue: 8 }
];

@Component({
  template: `
    <x-row>
      <x-col span="12">
        <x-cascade [data]="data1" [(ngModel)]="model1"></x-cascade>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-cascade [data]="data2" [(ngModel)]="model2"></x-cascade>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-cascade [data]="data3" [(ngModel)]="model3"></x-cascade>
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
  data1 = JSON.parse(JSON.stringify(data));
  data2 = JSON.parse(JSON.stringify(data));
  data3 = JSON.parse(JSON.stringify(data));
  model1: any;
  model2 = 22;
  model3 = 10;
  constructor(private cdr: ChangeDetectorRef) {
    interval(50).subscribe(x => {
      this.cdr.detectChanges();
    });
  }
}

@Component({
  template: `
    <x-row>
      <x-col span="12">
        <x-cascade label="方式" [data]="data" [(ngModel)]="model"></x-cascade>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-cascade label="方式" [data]="data" [(ngModel)]="model" direction="column-reverse"></x-cascade>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-cascade label="方式" [data]="data" [(ngModel)]="model" direction="row"></x-cascade>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-cascade label="方式" [data]="data" [(ngModel)]="model" direction="row-reverse"></x-cascade>
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
  model: any;
  constructor(private cdr: ChangeDetectorRef) {
    interval(50).subscribe(x => {
      this.cdr.detectChanges();
    });
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
        <x-cascade [data]="data" [(ngModel)]="model1" required></x-cascade>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-cascade [data]="data" [(ngModel)]="model2" label="选择" required></x-cascade>
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
  constructor(private cdr: ChangeDetectorRef) {
    interval(50).subscribe(x => {
      this.cdr.detectChanges();
    });
  }
}
