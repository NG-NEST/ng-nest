import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, ChangeDetectorRef, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XStepsComponent } from '@ng-nest/ui/steps';
import { XStepsPrefix } from './steps.property';
import { XButtonComponent, XButtonsComponent } from '@ng-nest/ui/button';
import { XTabsComponent, XTabComponent } from '@ng-nest/ui/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe(XStepsPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestXStepsComponent, TestXStepsDotComponent],
      imports: [
        BrowserAnimationsModule,

        XStepsComponent,
        XButtonComponent,
        XButtonsComponent,
        XTabsComponent,
        XTabComponent
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXStepsComponent>;
    let steps: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXStepsComponent);
      steps = fixture.debugElement.query(By.directive(XStepsComponent));
      fixture.detectChanges();
    });
    it('should create.', () => {
      expect(steps).toBeDefined();
    });
  });
  describe(`custom.`, () => {
    let fixture: ComponentFixture<TestXStepsDotComponent>;
    let steps: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXStepsDotComponent);
      fixture.detectChanges();
      steps = fixture.debugElement.query(By.directive(XStepsComponent));
    });
    it('should create.', () => {
      expect(steps).toBeDefined();
    });
  });
});

@Component({
  template: `
    <div class="row">
      <x-steps [data]="data" [activatedIndex]="activatedIndex"> </x-steps>
    </div>
    <div class="row">
      <x-button (click)="next()">下一步</x-button>
    </div>
    <div class="row">
      <x-steps [data]="dataDefault" activatedIndex="1"> </x-steps>
    </div>
    <div class="row">
      <x-steps [data]="dataDefault" activatedIndex="1" startIndex="3"> </x-steps>
    </div>
    <div class="row">
      <x-steps [data]="dataIcon" activatedIndex="2"> </x-steps>
    </div>

    <div class="row">
      <x-steps [data]="data" [activatedIndex]="activatedTab"> </x-steps>
    </div>
    <div class="row">
      <x-tabs sliderHidden [activatedIndex]="activatedTab">
        <x-tab> <div class="custom-steps-content">内容1</div></x-tab>
        <x-tab> <div class="custom-steps-content">内容2</div></x-tab>
        <x-tab> <div class="custom-steps-content">内容3</div></x-tab>
      </x-tabs>
    </div>
    <div class="row">
      <x-buttons space="1">
        <x-button (click)="preTab()" *ngIf="activatedTab > 0">上一步</x-button>
        <x-button (click)="nextTab()" *ngIf="activatedTab < 2">下一步</x-button>
        <x-button type="primary" (click)="doneTab()" *ngIf="activatedTab === 2">提交</x-button>
      </x-buttons>
    </div>
    <div class="row">
      <x-steps [data]="dataDefault" activatedIndex="1" layout="column"> </x-steps>
    </div>
    <div class="row">
      <x-steps [data]="dataError" activatedIndex="1" status="error"> </x-steps>
    </div>
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      .row {
        margin-top: 2rem;
      }
      .row:not(:first-child) {
        margin-top: 1rem;
      }
      .custom-steps-content {
        height: 10rem;
        border: 0.0625rem solid var(--x-border);
        border-radius: 0.125rem;
        line-height: 10rem;
        text-align: center;
      }
    `
  ]
})
class TestXStepsComponent {
  activatedIndex = 0;
  data = ['步骤 1', '步骤 2', '步骤 3'];
  dataDefault = [
    { label: '完成', description: '这是描述内容。' },
    { label: '进行中', description: '这是描述内容。' },
    { label: '等待', description: '这是描述内容。' }
  ];
  dataIcon = [
    { label: '登录', icon: 'fto-user' },
    { label: '验证', icon: 'fto-user-check' },
    { label: '付款', icon: 'fto-credit-card' },
    { label: '完成', icon: 'fto-smile' }
  ];
  activatedTab = 0;
  dataError = ['完成', '执行错误', '等待'];

  constructor(private cdr: ChangeDetectorRef) {}

  next() {
    this.activatedIndex++;
    if (this.activatedIndex > this.data.length - 1) this.activatedIndex = 0;
    this.cdr.detectChanges();
  }

  preTab() {
    this.activatedTab -= 1;
    this.cdr.detectChanges();
  }

  nextTab() {
    this.activatedTab += 1;
    this.cdr.detectChanges();
  }

  doneTab() {
    console.log('提交');
  }
}

@Component({
  template: `
    <div class="row">
      <x-steps [data]="data" [customTpl]="customTpl" [activatedIndex]="activatedIndex"> </x-steps>
    </div>
    <ng-template #customTpl let-node="$node" let-index="$index">
      <ng-container [ngSwitch]="node.status">
        <ng-container *ngSwitchCase="'process'">
          <svg class="custom-loading-circular" viewBox="25 25 50 50">
            <circle class="custom-loading-path" cx="50" cy="50" r="20" fill="none" />
          </svg>
        </ng-container>
        <div *ngSwitchDefault class="custom-class {{ node.status }}"></div>
      </ng-container>
    </ng-template>
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      .row {
        margin-top: 2rem;
      }
      .row:not(:first-child) {
        margin-top: 1rem;
      }
      .custom-class {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 0.5rem;
        margin-top: 0.75rem;
        background-color: var(--x-primary);
      }
      .custom-class.wait {
        background-color: var(--x-background-a900);
      }
      .custom-loading-circular {
        animation: loading-rotate 2s linear infinite;
        height: 1.75rem;
        width: 1.75rem;
      }
      .custom-loading-path {
        animation: loading-dash 1.5s ease-in-out infinite;
        stroke-dasharray: 90, 150;
        stroke-dashoffset: 0;
        stroke-width: 2;
        stroke: var(--x-primary);
        stroke-linecap: round;
      }
      @keyframes loading-rotate {
        100% {
          transform: rotate(360deg);
        }
      }

      @keyframes loading-dash {
        0% {
          stroke-dasharray: 1, 200;
          stroke-dashoffset: 0;
        }
        50% {
          stroke-dasharray: 90, 150;
          stroke-dashoffset: -2.5rem;
        }
        100% {
          stroke-dasharray: 90, 150;
          stroke-dashoffset: -7.5rem;
        }
      }
    `
  ]
})
class TestXStepsDotComponent {
  data = ['步骤 1', '步骤 2', '步骤 3'];
  activatedIndex = 1;
}
