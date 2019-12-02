import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { XInputNumberComponent } from "./input-number.component";
import { Component, DebugElement, ChangeDetectorRef } from "@angular/core";
import { By } from "@angular/platform-browser";
import { XInputNumberModule } from "./input-number.module";
import { FormsModule, ReactiveFormsModule, FormControl } from "@angular/forms";
import { XInputNumberPrefix, XInputNumberType, XInputNumberIconLayoutType } from "./input-number.type";
import { XFenceModule } from "@ng-nest/ui/fence";
import { interval } from "rxjs";

describe(XInputNumberPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XInputNumberModule, FormsModule, ReactiveFormsModule, XFenceModule],
      declarations: [
        TestXInputNumberComponent,
        TestXInputNumberLabelComponent,
        TestXInputNumberIconComponent,
        TestXInputNumberDisabledComponent,
        TestXInputNumberRequiredComponent,
        TestXInputNumberLengthComponent
      ]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXInputNumberComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXInputNumberComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XInputNumberComponent));
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`label.`, () => {
    let fixture: ComponentFixture<TestXInputNumberLabelComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXInputNumberLabelComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXInputNumberLabelComponent));
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`icon.`, () => {
    let fixture: ComponentFixture<TestXInputNumberIconComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXInputNumberIconComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXInputNumberIconComponent));
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`disabled.`, () => {
    let fixture: ComponentFixture<TestXInputNumberDisabledComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXInputNumberDisabledComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXInputNumberDisabledComponent));
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`required.`, () => {
    let fixture: ComponentFixture<TestXInputNumberRequiredComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXInputNumberRequiredComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXInputNumberRequiredComponent));
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`length.`, () => {
    let fixture: ComponentFixture<TestXInputNumberLengthComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXInputNumberLengthComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXInputNumberLengthComponent));
    });
    it("should create.", () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  template: `
    <x-row>
      <x-col span="24">
        <x-input-number></x-input-number>
      </x-col>
      <x-col span="24">
        <x-input-number placeholder="请输入内容"></x-input-number>
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
class TestXInputNumberComponent {
  constructor(private cdr: ChangeDetectorRef) {
    // interval(1000).subscribe(x => {
    //   console.log(x);
    //   this.cdr.detectChanges();
    // });
  }
}

@Component({
  template: `
    <x-row>
      <x-col span="24">
        <x-input-number label="用户名"></x-input-number>
      </x-col>
      <x-col span="24">
        <x-input-number label="用户名" direction="column-reverse"></x-input-number>
      </x-col>
      <x-col span="24">
        <x-input-number label="用户名" direction="row"></x-input-number>
      </x-col>
      <x-col span="24">
        <x-input-number label="用户名" direction="row-reverse"></x-input-number>
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
class TestXInputNumberLabelComponent {}

@Component({
  template: `
    <x-row>
      <x-col span="24">
        <x-input-number icon="ado-user"></x-input-number>
      </x-col>
      <x-col span="24">
        <x-input-number icon="ado-user" iconLayout="right"></x-input-number>
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
class TestXInputNumberIconComponent {}

@Component({
  template: `
    <x-row>
      <x-col span="24">
        <x-input-number disabled></x-input-number>
      </x-col>
      <x-col span="24">
        <x-input-number disabled [(ngModel)]="model"></x-input-number>
      </x-col>
      <x-col span="24">
        <x-input-number icon="ado-user" disabled></x-input-number>
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
class TestXInputNumberDisabledComponent {
  model = 10;
  constructor(private cdr: ChangeDetectorRef) {
    interval(1000).subscribe(() => {
      this.cdr.detectChanges();
    });
  }
}

@Component({
  template: `
    <x-row>
      <x-col span="24">
        <x-input-number required [(ngModel)]="value" (ngModelChange)="change($event)"></x-input-number>
      </x-col>
      <x-col span="24">
        <x-input-number label="用户名" required [(ngModel)]="value" (ngModelChange)="change($event)"></x-input-number>
      </x-col>
      <x-col span="24">
        <x-input-number icon="ado-user" required [(ngModel)]="value" (ngModelChange)="change($event)"></x-input-number>
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
class TestXInputNumberRequiredComponent {
  value: any;
  constructor(private cdr: ChangeDetectorRef) {}
  change(val) {
    this.cdr.detectChanges();
  }
}

@Component({
  template: `
    <x-row>
      <x-col span="24">
        <x-input-number [(ngModel)]="value" (ngModelChange)="change($event)" maxlength="50"></x-input-number>
      </x-col>
      <x-col span="24">
        <x-input-number
          [(ngModel)]="value"
          (ngModelChange)="change($event)"
          label="用户名"
          maxlength="50"
        ></x-input-number>
      </x-col>
      <x-col span="24">
        <x-input-number
          [(ngModel)]="value"
          (ngModelChange)="change($event)"
          label="用户名"
          direction="row"
          maxlength="50"
        ></x-input-number>
      </x-col>
      <x-col span="24">
        <x-input-number
          [(ngModel)]="value"
          (ngModelChange)="change($event)"
          icon="ado-user"
          maxlength="50"
        ></x-input-number>
      </x-col>
      <x-col span="24">
        <x-input-number
          [(ngModel)]="value"
          (ngModelChange)="change($event)"
          icon="ado-user"
          iconLayout="right"
          maxlength="50"
        ></x-input-number>
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
class TestXInputNumberLengthComponent {
  value: any;
  constructor(private cdr: ChangeDetectorRef) {}
  change(val) {
    this.cdr.detectChanges();
  }
}
