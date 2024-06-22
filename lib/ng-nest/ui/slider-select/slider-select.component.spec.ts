import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XSliderSelectComponent } from '@ng-nest/ui/slider-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XSliderSelectPrefix } from './slider-select.property';
import { XRowComponent, XColComponent } from '@ng-nest/ui/layout';
import { XTabsComponent, XTabComponent } from '@ng-nest/ui/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XButtonComponent } from '@ng-nest/ui/button';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe(XSliderSelectPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestXSliderSelectComponent,
        TestXSliderSelectLabelComponent,
        TestXSliderSelectLimitComponent,
        TestXSliderSelectPrecisionComponent,
        TestXSliderSelectDisabledComponent,
        TestXSliderSelectTabsComponent
      ],
      imports: [
        BrowserAnimationsModule,
        XSliderSelectComponent,
        FormsModule,
        ReactiveFormsModule,
        XRowComponent,
        XColComponent,
        XTabsComponent,
        XTabComponent,
        XIconComponent,
        XButtonComponent
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXSliderSelectComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXSliderSelectComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XSliderSelectComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`label.`, () => {
    let fixture: ComponentFixture<TestXSliderSelectLabelComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXSliderSelectLabelComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXSliderSelectLabelComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`limit.`, () => {
    let fixture: ComponentFixture<TestXSliderSelectLimitComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXSliderSelectLimitComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXSliderSelectLimitComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`precision.`, () => {
    let fixture: ComponentFixture<TestXSliderSelectPrecisionComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXSliderSelectPrecisionComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXSliderSelectPrecisionComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`disabled.`, () => {
    let fixture: ComponentFixture<TestXSliderSelectDisabledComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXSliderSelectDisabledComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXSliderSelectDisabledComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`tabs.`, () => {
    let fixture: ComponentFixture<TestXSliderSelectTabsComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXSliderSelectTabsComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(TestXSliderSelectDisabledComponent));
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
        <x-slider-select></x-slider-select>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-slider-select [(ngModel)]="model"></x-slider-select>
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
class TestXSliderSelectComponent {
  model = 60;
}

@Component({
  template: `
    <x-row>
      <x-col span="12">
        <x-slider-select max="10" [(ngModel)]="model1"></x-slider-select>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-slider-select min="-10" [(ngModel)]="model2"></x-slider-select>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-slider-select min="-10" max="10" [(ngModel)]="model3"></x-slider-select>
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
class TestXSliderSelectLimitComponent {
  model1 = 0;
  model2 = 0;
  model3 = 0;
}

@Component({
  template: `
    <x-row>
      <x-col span="12">
        <x-slider-select min="0" max="1" step="0.1"></x-slider-select>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-slider-select min="0" max="1" step="0.01"></x-slider-select>
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
class TestXSliderSelectPrecisionComponent {}

@Component({
  template: `
    <x-row>
      <x-col span="12">
        <x-slider-select label="数量" [(ngModel)]="model"></x-slider-select>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-slider-select label="数量" [(ngModel)]="model" direction="column-reverse"></x-slider-select>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-slider-select label="数量" [(ngModel)]="model" direction="row"></x-slider-select>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-slider-select label="数量" [(ngModel)]="model" direction="row-reverse"></x-slider-select>
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
class TestXSliderSelectLabelComponent {
  model: number = 0;
}

@Component({
  template: `
    <x-row>
      <x-col span="12">
        <x-slider-select disabled></x-slider-select>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="12">
        <x-slider-select disabled [(ngModel)]="model"></x-slider-select>
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
class TestXSliderSelectDisabledComponent {
  model = 60;
}

@Component({
  template: `
    <x-tabs>
      <x-tab label="1111">
        <x-row>
          <x-col span="12">
            <x-slider-select min="0" max="1" step="0.1"></x-slider-select>
          </x-col>
        </x-row>
        <x-row>
          <x-col span="12">
            <x-slider-select min="0" max="1" step="0.01"></x-slider-select>
          </x-col>
        </x-row>
      </x-tab>
      <x-tab label="2222">
        <x-row>
          <x-col span="12">
            <x-slider-select min="0" max="1" step="0.1" [(ngModel)]="model1"></x-slider-select>
          </x-col>
        </x-row>
        <x-row>
          <x-col span="12">
            <x-slider-select min="0" max="1" step="0.01" [(ngModel)]="model2"></x-slider-select>
          </x-col>
        </x-row>
      </x-tab>
    </x-tabs>
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
class TestXSliderSelectTabsComponent {
  model1 = 0.3;
  model2 = 0.44;
}
