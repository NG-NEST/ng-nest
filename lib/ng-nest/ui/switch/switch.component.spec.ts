import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, ChangeDetectorRef, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XSwitchComponent } from '@ng-nest/ui/switch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XSwitchPrefix } from './switch.property';
import { XRowComponent, XColComponent } from '@ng-nest/ui/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { provideHttpClientTesting } from '@angular/common/http/testing';
import { XRadioComponent } from '@ng-nest/ui/radio';
import { XInputComponent } from '@ng-nest/ui/input';
import { XIconComponent } from '@ng-nest/ui/icon';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe(XSwitchPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestXSwitchComponent, TestXSwitchLabelComponent, TestXSwitchDisabledComponent],
      imports: [
        BrowserAnimationsModule,
        
        XSwitchComponent,
        FormsModule,
        ReactiveFormsModule,
        XRowComponent,
        XColComponent,
        XRadioComponent,
        XInputComponent,
        XIconComponent
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXSwitchComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXSwitchComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XSwitchComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`label.`, () => {
    let fixture: ComponentFixture<TestXSwitchLabelComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXSwitchLabelComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXSwitchLabelComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`disabled.`, () => {
    let fixture: ComponentFixture<TestXSwitchDisabledComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXSwitchDisabledComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXSwitchDisabledComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  template: `
    
    <x-row>
      <x-col span="12">
        <x-switch [(ngModel)]="model1" (ngModelChange)="change($event)"></x-switch>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-switch [(ngModel)]="model2" (ngModelChange)="change($event)"></x-switch>
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
class TestXSwitchComponent {
  model1!: boolean;
  model2 = true;
  constructor(private cdr: ChangeDetectorRef) {}
  change() {
    this.cdr.detectChanges();
  }
}

@Component({
  template: `
    
    <x-row>
      <x-col span="12">
        <x-switch label="方式"></x-switch>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-switch label="方式" direction="column-reverse"></x-switch>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-switch label="方式" direction="row"></x-switch>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-switch label="方式" direction="row-reverse"></x-switch>
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
class TestXSwitchLabelComponent {
  constructor() {}
}

@Component({
  template: `
    
    <x-row>
      <x-col span="12">
        <x-switch disabled></x-switch>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-switch [(ngModel)]="model" disabled></x-switch>
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
class TestXSwitchDisabledComponent {
  model = true;
}
