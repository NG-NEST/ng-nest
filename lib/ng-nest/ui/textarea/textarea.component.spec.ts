import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XTextareaComponent } from './textarea.component';
import { Component, DebugElement, ChangeDetectorRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XTextareaModule } from '@ng-nest/ui/textarea';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XTextareaPrefix } from './textarea.property';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { interval } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XThemeModule } from '@ng-nest/ui/theme';

describe(XTextareaPrefix, () => {
  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, XThemeModule, XTextareaModule, FormsModule, ReactiveFormsModule, XLayoutModule],
      declarations: [
        TestXTextareaComponent,
        TestXTextareaLabelComponent,
        TestXTextareaIconComponent,
        TestXTextareaClearableComponent,
        TestXTextareaDisabledComponent,
        TestXTextareaRequiredComponent,
        TestXTextareaLengthComponent
      ]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXTextareaComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXTextareaComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XTextareaComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`label.`, () => {
    let fixture: ComponentFixture<TestXTextareaLabelComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXTextareaLabelComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXTextareaLabelComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`icon.`, () => {
    let fixture: ComponentFixture<TestXTextareaIconComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXTextareaIconComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXTextareaIconComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`clearable.`, () => {
    let fixture: ComponentFixture<TestXTextareaClearableComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXTextareaClearableComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXTextareaClearableComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`disabled.`, () => {
    let fixture: ComponentFixture<TestXTextareaDisabledComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXTextareaDisabledComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXTextareaDisabledComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`required.`, () => {
    let fixture: ComponentFixture<TestXTextareaRequiredComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXTextareaRequiredComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXTextareaRequiredComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`length.`, () => {
    let fixture: ComponentFixture<TestXTextareaLengthComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXTextareaLengthComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXTextareaLengthComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row>
      <x-col span="24">
        <x-textarea></x-textarea>
      </x-col>
      <x-col span="24">
        <x-textarea placeholder="请输入内容"></x-textarea>
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
class TestXTextareaComponent {
  constructor(private cdr: ChangeDetectorRef) {
    interval(1000).subscribe(() => {
      this.cdr.detectChanges();
    });
  }
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row>
      <x-col span="24">
        <x-textarea label="用户名"></x-textarea>
      </x-col>
      <x-col span="24">
        <x-textarea label="用户名" direction="column-reverse"></x-textarea>
      </x-col>
      <x-col span="24">
        <x-textarea label="用户名" direction="row"></x-textarea>
      </x-col>
      <x-col span="24">
        <x-textarea label="用户名" direction="row-reverse"></x-textarea>
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
class TestXTextareaLabelComponent {}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row>
      <x-col span="24">
        <x-textarea icon="ado-user"></x-textarea>
      </x-col>
      <x-col span="24">
        <x-textarea icon="ado-user" iconLayout="left"></x-textarea>
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
class TestXTextareaIconComponent {}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row>
      <x-col span="8">
        <x-textarea clearable [(ngModel)]="model" (ngModelChange)="change()"></x-textarea>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="8">
        <x-textarea clearable [(ngModel)]="modelValue" (ngModelChange)="change()"></x-textarea>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="8">
        <x-textarea icon="ado-user" clearable [(ngModel)]="modelIcon" (ngModelChange)="change()"></x-textarea>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="8">
        <x-textarea icon="ado-user" clearable [(ngModel)]="modelIcon" iconLayout="left" (ngModelChange)="change()"></x-textarea>
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
      x-row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXTextareaClearableComponent {
  model: any;
  modelValue = '显示清除按钮';
  modelIcon: any;
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
        <x-textarea disabled></x-textarea>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="8">
        <x-textarea disabled [(ngModel)]="model"></x-textarea>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="8">
        <x-textarea disabled clearable [(ngModel)]="modelClearable"></x-textarea>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="8">
        <x-textarea icon="ado-user" disabled></x-textarea>
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
      x-row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXTextareaDisabledComponent {
  model = '输入框禁用';
  modelClearable = '禁用状态下，不显示清除按钮';
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row>
      <x-col span="8">
        <x-textarea required [(ngModel)]="value" (ngModelChange)="change()"></x-textarea>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="8">
        <x-textarea label="用户名" required [(ngModel)]="value" (ngModelChange)="change()"></x-textarea>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="8">
        <x-textarea icon="ado-user" required [(ngModel)]="value" (ngModelChange)="change()"></x-textarea>
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
      x-row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXTextareaRequiredComponent {
  value: any;
  constructor(private cdr: ChangeDetectorRef) {}
  change() {
    this.cdr.detectChanges();
  }
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <x-row>
      <x-col span="24">
        <x-textarea [(ngModel)]="value" (ngModelChange)="change()" maxlength="50"></x-textarea>
      </x-col>
      <x-col span="24">
        <x-textarea [(ngModel)]="value" (ngModelChange)="change()" label="用户名" maxlength="50"></x-textarea>
      </x-col>
      <x-col span="24">
        <x-textarea [(ngModel)]="value" (ngModelChange)="change()" label="用户名" direction="row" maxlength="50"></x-textarea>
      </x-col>
      <x-col span="24">
        <x-textarea [(ngModel)]="value" (ngModelChange)="change()" icon="ado-user" maxlength="50"></x-textarea>
      </x-col>
      <x-col span="24">
        <x-textarea [(ngModel)]="value" (ngModelChange)="change()" icon="ado-user" iconLayout="left" maxlength="50"></x-textarea>
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
class TestXTextareaLengthComponent {
  value: any;
  constructor(private cdr: ChangeDetectorRef) {}
  change() {
    this.cdr.detectChanges();
  }
}
