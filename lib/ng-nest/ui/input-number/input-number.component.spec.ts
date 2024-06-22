import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef, Component, DebugElement, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XInputNumberComponent } from '@ng-nest/ui/input-number';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XInputNumberPrefix } from './input-number.property';
import { XRowComponent, XColComponent } from '@ng-nest/ui/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { XRadioComponent } from '@ng-nest/ui/radio';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe(XInputNumberPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestXInputNumberComponent,
        TestXInputNumberLabelComponent,
        TestXInputNumberLimitComponent,
        TestXInputNumberPrecisionComponent,
        TestXInputNumberDisabledComponent,
        TestXInputNumberRequiredComponent,
        TestXInputNumberSizeComponent,
        TestXInputNumberBorderedComponent
      ],
      imports: [
        BrowserAnimationsModule,
        
        XInputNumberComponent,
        FormsModule,
        ReactiveFormsModule,
        XRowComponent,
        XColComponent,
        XRadioComponent
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXInputNumberComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXInputNumberComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XInputNumberComponent));
    });
    it('should create.', () => {
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
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`limit.`, () => {
    let fixture: ComponentFixture<TestXInputNumberLimitComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXInputNumberLimitComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXInputNumberLimitComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`precision.`, () => {
    let fixture: ComponentFixture<TestXInputNumberPrecisionComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXInputNumberPrecisionComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXInputNumberPrecisionComponent));
    });
    it('should create.', () => {
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
    it('should create.', () => {
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
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`size.`, () => {
    let fixture: ComponentFixture<TestXInputNumberSizeComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXInputNumberSizeComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXInputNumberComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`bordered.`, () => {
    let fixture: ComponentFixture<TestXInputNumberBorderedComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXInputNumberBorderedComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXInputNumberComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  template: `
    
    <x-row>
      <x-col>
        <x-input-number></x-input-number>
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
      x-row > x-col {
        width: 10rem;
      }
    `
  ]
})
class TestXInputNumberComponent {}

@Component({
  template: `
    
    <x-row>
      <x-col>
        <x-input-number label="数量"></x-input-number>
      </x-col>
    </x-row>
    <x-row>
      <x-col>
        <x-input-number label="数量" direction="column-reverse"></x-input-number>
      </x-col>
    </x-row>
    <x-row>
      <x-col>
        <x-input-number label="数量" direction="row"></x-input-number>
      </x-col>
    </x-row>
    <x-row>
      <x-col>
        <x-input-number label="数量" direction="row-reverse"></x-input-number>
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
      x-row > x-col {
        width: 10rem;
      }
      x-row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXInputNumberLabelComponent {}

@Component({
  template: `
    
    <x-row>
      <x-col>
        <x-input-number max="10"></x-input-number>
      </x-col>
    </x-row>
    <x-row>
      <x-col>
        <x-input-number min="1"></x-input-number>
      </x-col>
    </x-row>
    <x-row>
      <x-col>
        <x-input-number min="1" max="10"></x-input-number>
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
      x-row > x-col {
        width: 10rem;
      }
      x-row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXInputNumberLimitComponent {}

@Component({
  template: `
    
    <x-row>
      <x-col>
        <x-input-number precision="2" step="0.1"></x-input-number>
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
      x-row > x-col {
        width: 10rem;
      }
      x-row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXInputNumberPrecisionComponent {}

@Component({
  template: `
    
    <x-row>
      <x-col>
        <x-input-number disabled></x-input-number>
      </x-col>
      <x-col>
        <x-input-number disabled [(ngModel)]="model"></x-input-number>
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
      x-row > x-col {
        width: 10rem;
      }
      x-row > x-col:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXInputNumberDisabledComponent {
  model = 10;
}

@Component({
  template: `
    
    <x-row>
      <x-col>
        <x-input-number required></x-input-number>
      </x-col>
      <x-col>
        <x-input-number label="数量" required></x-input-number>
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
      x-row > x-col {
        width: 10rem;
      }
      x-row > x-col:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXInputNumberRequiredComponent {}

@Component({
  template: `
    <x-radio [data]="radioData" [(ngModel)]="size" (ngModelChange)="change($event)"></x-radio>
    <x-row>
      <x-col span="24">
        <x-input-number [size]="size"></x-input-number>
      </x-col>
      <x-col span="24">
        <x-input-number [size]="size" label="用户名" direction="row"></x-input-number>
      </x-col>
      <x-col span="24">
        <x-input-number [size]="size" label="用户名" direction="column"></x-input-number>
      </x-col>
      <x-col span="24">
        <x-input-number [size]="size" precision="2" step="0.1"></x-input-number>
      </x-col>
      <x-col span="24">
        <x-input-number required [size]="size"></x-input-number>
      </x-col>
      <x-col span="24">
        <x-input-number disabled [size]="size"></x-input-number>
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
      x-row > x-col > x-input-number {
        width: 15rem;
        display: block;
      }
      x-row > x-col:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXInputNumberSizeComponent {
  radioData = ['big', 'large', 'medium', 'small', 'mini'];
  size = 'medium';
  constructor(private cdr: ChangeDetectorRef) {}
  change($event: string) {
    console.log($event);
    this.cdr.detectChanges();
  }
}

@Component({
  template: `
    <x-row>
      <x-col span="24">
        <x-input-number placeholder="请输入" bordered="false"></x-input-number>
      </x-col>
      <x-col span="24">
        <x-input-number placeholder="请输入" bordered="false" label="数量:" direction="row"></x-input-number>
      </x-col>
      <x-col span="24">
        <x-input-number placeholder="请输入" bordered="false"></x-input-number>
      </x-col>
      <x-col span="24">
        <x-input-number placeholder="请输入" bordered="false" required></x-input-number>
      </x-col>
      <x-col span="24">
        <x-input-number placeholder="没有边框" bordered="false" disabled></x-input-number>
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
      x-row > x-col > x-input-number {
        width: 15rem;
        display: block;
      }
      x-row > x-col:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXInputNumberBorderedComponent {
  constructor() {}
}
