import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XStepsComponent } from './steps.component';
import { Component, DebugElement, ChangeDetectorRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XStepsModule } from '@ng-nest/ui/steps';
import { XStepsPrefix } from './steps.property';
import { XButtonModule } from '@ng-nest/ui/button';
import { XTabsModule } from '@ng-nest/ui/tabs';

describe(XStepsPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XStepsModule, XButtonModule, XTabsModule],
      declarations: [TestXStepsComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXStepsComponent>;
    let steps: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXStepsComponent);
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
