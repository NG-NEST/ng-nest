import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XInputComponent } from './input.component';
import { Component, DebugElement, ChangeDetectorRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XInputModule } from './input.module';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { XInputPrefix, XInputType, XInputIconLayoutType } from './input.type';
import { XFenceModule } from '@ng-nest/ui/fence';
import { interval } from 'rxjs';

describe(XInputPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XInputModule, FormsModule, ReactiveFormsModule, XFenceModule],
      declarations: [
        TestXInputComponent,
        TestXInputLabelComponent,
        TestXInputIconComponent,
        TestXInputClearableComponent,
        TestXInputDisabledComponent,
        TestXInputRequiredComponent,
        TestXInputLengthComponent,
        TestXInputSizeComponent
      ]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXInputComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXInputComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XInputComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`label.`, () => {
    let fixture: ComponentFixture<TestXInputLabelComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXInputLabelComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXInputLabelComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`icon.`, () => {
    let fixture: ComponentFixture<TestXInputIconComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXInputIconComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXInputIconComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`clearable.`, () => {
    let fixture: ComponentFixture<TestXInputClearableComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXInputClearableComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXInputClearableComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`disabled.`, () => {
    let fixture: ComponentFixture<TestXInputDisabledComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXInputDisabledComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXInputDisabledComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`required.`, () => {
    let fixture: ComponentFixture<TestXInputRequiredComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXInputRequiredComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXInputRequiredComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`length.`, () => {
    let fixture: ComponentFixture<TestXInputLengthComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXInputLengthComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXInputLengthComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`size.`, () => {
    let fixture: ComponentFixture<TestXInputSizeComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXInputSizeComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXInputSizeComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  template: `
    <x-row>
      <x-col span="24">
        <x-input></x-input>
      </x-col>
      <x-col span="24">
        <x-input placeholder="请输入内容"></x-input>
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
class TestXInputComponent {
  constructor(private cdr: ChangeDetectorRef) {
    interval(1000).subscribe(x => {
      this.cdr.detectChanges();
    });
  }
}

@Component({
  template: `
    <x-row>
      <x-col span="24">
        <x-input label="用户名"></x-input>
      </x-col>
      <x-col span="24">
        <x-input label="用户名" direction="column-reverse"></x-input>
      </x-col>
      <x-col span="24">
        <x-input label="用户名" direction="row"></x-input>
      </x-col>
      <x-col span="24">
        <x-input label="用户名" direction="row-reverse"></x-input>
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
class TestXInputLabelComponent {}

@Component({
  template: `
    <x-row>
      <x-col span="24">
        <x-input icon="ado-user"></x-input>
      </x-col>
      <x-col span="24">
        <x-input icon="ado-user" iconLayout="right"></x-input>
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
class TestXInputIconComponent {}

@Component({
  template: `
    <x-row>
      <x-col span="8">
        <x-input clearable [(ngModel)]="model" (ngModelChange)="change($event)"></x-input>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="8">
        <x-input clearable [(ngModel)]="modelValue" (ngModelChange)="change($event)"></x-input>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="8">
        <x-input icon="ado-user" clearable [(ngModel)]="modelIcon" (ngModelChange)="change($event)"></x-input>
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
class TestXInputClearableComponent {
  model: any;
  modelValue = '显示清除按钮';
  modelIcon: any;
  constructor(private cdr: ChangeDetectorRef) {}
  change(val) {
    this.cdr.detectChanges();
  }
}

@Component({
  template: `
    <x-row>
      <x-col span="8">
        <x-input disabled></x-input>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="8">
        <x-input disabled [(ngModel)]="model"></x-input>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="8">
        <x-input disabled clearable [(ngModel)]="modelClearable"></x-input>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="8">
        <x-input icon="ado-user" disabled></x-input>
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
class TestXInputDisabledComponent {
  model = '输入框禁用';
  modelClearable = '禁用状态下，不显示清除按钮';
}

@Component({
  template: `
    <x-row>
      <x-col span="8">
        <x-input required [(ngModel)]="value" (ngModelChange)="change($event)"></x-input>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="8">
        <x-input label="用户名" required [(ngModel)]="value" (ngModelChange)="change($event)"></x-input>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="8">
        <x-input icon="ado-user" required [(ngModel)]="value" (ngModelChange)="change($event)"></x-input>
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
class TestXInputRequiredComponent {
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
        <x-input [(ngModel)]="value" (ngModelChange)="change($event)" maxlength="50"></x-input>
      </x-col>
      <x-col span="24">
        <x-input [(ngModel)]="value" (ngModelChange)="change($event)" label="用户名" maxlength="50"></x-input>
      </x-col>
      <x-col span="24">
        <x-input
          [(ngModel)]="value"
          (ngModelChange)="change($event)"
          label="用户名"
          direction="row"
          maxlength="50"
        ></x-input>
      </x-col>
      <x-col span="24">
        <x-input [(ngModel)]="value" (ngModelChange)="change($event)" icon="ado-user" maxlength="50"></x-input>
      </x-col>
      <x-col span="24">
        <x-input
          [(ngModel)]="value"
          (ngModelChange)="change($event)"
          icon="ado-user"
          iconLayout="right"
          maxlength="50"
        ></x-input>
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
class TestXInputLengthComponent {
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
        <x-input [(ngModel)]="value" (ngModelChange)="change($event)" size="large"></x-input>
      </x-col>
      <x-col span="24">
        <x-input [(ngModel)]="value" (ngModelChange)="change($event)" size="medium"></x-input>
      </x-col>
      <x-col span="24">
        <x-input [(ngModel)]="value" (ngModelChange)="change($event)"></x-input>
      </x-col>
      <x-col span="24">
        <x-input [(ngModel)]="value" (ngModelChange)="change($event)" size="small"></x-input>
      </x-col>
      <x-col span="24">
        <x-input [(ngModel)]="value" (ngModelChange)="change($event)" size="mini"></x-input>
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
class TestXInputSizeComponent {
  value: any;
  constructor(private cdr: ChangeDetectorRef) {}
  change(val) {
    this.cdr.detectChanges();
  }
}
