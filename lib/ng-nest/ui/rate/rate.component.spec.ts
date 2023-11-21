import { XButtonComponent } from '@ng-nest/ui/button';
import {
  ComponentFixture,
  TestBed,
  __core_private_testing_placeholder__
} from '@angular/core/testing';

import { XRateComponent } from './rate.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XRowComponent, XColComponent } from '@ng-nest/ui/layout';
import { XRateModule } from '@ng-nest/ui/rate';
import { FormsModule } from '@angular/forms';
import { XRatePrefix } from './rate.property';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XIconComponent } from '@ng-nest/ui/icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe(XRatePrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        FormsModule,
        XRateModule,
        XButtonComponent,
        XRowComponent,
        XColComponent,
        XIconComponent
      ],
      declarations: [
        TestXRateComponent,
        TestXRateHalfComponent,
        TestXRateDisabledComponent,
        TestXRateCustomComponent
      ]
    }).compileComponents();
  });
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXRateComponent>;
    let rate: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXRateComponent);
      fixture.detectChanges();
      rate = fixture.debugElement.query(By.directive(XRateComponent));
    });
    it('should create.', () => {
      expect(rate).toBeDefined();
    });
  });
  describe(`half.`, () => {
    let fixture: ComponentFixture<TestXRateHalfComponent>;
    let rate: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXRateHalfComponent);
      fixture.detectChanges();
      rate = fixture.debugElement.query(By.directive(XRateComponent));
    });
    it('should create.', () => {
      expect(rate).toBeDefined();
    });
  });
  describe(`custom.`, () => {
    let fixture: ComponentFixture<TestXRateCustomComponent>;
    let rate: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXRateCustomComponent);
      fixture.detectChanges();
      rate = fixture.debugElement.query(By.directive(XRateComponent));
    });
    it('should create.', () => {
      expect(rate).toBeDefined();
    });
  });
  describe(`disabled.`, () => {
    let fixture: ComponentFixture<TestXRateDisabledComponent>;
    let rate: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXRateDisabledComponent);
      fixture.detectChanges();
      rate = fixture.debugElement.query(By.directive(XRateComponent));
    });
    it('should create.', () => {
      expect(rate).toBeDefined();
    });
  });
});

@Component({
  template: `
    <x-row>
      <x-col span="24">
        <x-rate></x-rate>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="24">
        <x-rate [(ngModel)]="model"></x-rate>
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
      x-row > x-col {
        width: 14rem;
      }
    `
  ]
})
class TestXRateComponent {
  model = 3;
}

@Component({
  template: `
    <x-row>
      <x-col span="24">
        <x-rate half></x-rate>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="24">
        <x-rate
          label="评级"
          direction="row"
          [(ngModel)]="model"
          (ngModelChange)="chang($event)"
          half
        ></x-rate>
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
      x-row > x-col {
        width: 14rem;
      }
    `
  ]
})
class TestXRateHalfComponent {
  model = 3.5;
  chang(event: number) {
    console.log(event);
  }
}

@Component({
  template: `
    <x-row>
      <x-col span="24">
        <x-rate half [customTemp]="iconTpl"></x-rate>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="24">
        <x-rate half [customTemp]="letterTpl"></x-rate>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="24">
        <x-rate half [(ngModel)]="model" [customTemp]="chineseTpl"></x-rate>
      </x-col>
    </x-row>
    <ng-template #iconTpl><x-icon type="fto-eye"></x-icon></ng-template>
    <ng-template #letterTpl>X</ng-template>
    <ng-template #chineseTpl>田</ng-template>
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
      x-row > x-col {
        width: 14rem;
      }
    `
  ]
})
class TestXRateCustomComponent {
  model = 3.5;
  chang(event: number) {
    console.log(event);
  }
}

@Component({
  template: `
    <x-row>
      <x-col span="24">
        <x-rate disabled></x-rate>
      </x-col>
    </x-row>
    <x-row>
      <x-col span="24">
        <x-rate [(ngModel)]="model" disabled></x-rate>
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
      x-row > x-col {
        width: 14rem;
      }
    `
  ]
})
class TestXRateDisabledComponent {
  model = 3;
}
