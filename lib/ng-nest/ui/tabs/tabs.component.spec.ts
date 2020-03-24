import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XTabsComponent } from './tabs.component';
import { Component, DebugElement, ChangeDetectorRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XTabsModule } from './tabs.module';
import { XTabsPrefix, XTabsLayout } from './tabs.type';
import { XRadioModule } from '@ng-nest/ui/radio';
import { FormsModule } from '@angular/forms';
import { XIconModule } from '@ng-nest/ui/icon';

describe(XTabsPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, XTabsModule, XRadioModule, XIconModule],
      declarations: [TestXTabsComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXTabsComponent>;
    let testComponent: TestXTabsComponent;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXTabsComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XTabsComponent));
      element = debugElement.nativeElement;
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  selector: 'test-x-tabs',
  template: `
    <div class="row">
      <x-tabs>
        <x-tab *ngFor="let label of labels" [label]="label">
          <div class="tab-content">{{ label }}</div>
        </x-tab>
      </x-tabs>
    </div>
    <div class="row">
      <x-tabs type="tag">
        <x-tab *ngFor="let label of labels" [label]="label">
          <div class="tab-content">{{ label }}</div>
        </x-tab>
      </x-tabs>
    </div>
    <div class="row">
      <x-tabs type="card">
        <x-tab *ngFor="let label of labels" [label]="label">
          <div class="tab-content">{{ label }}</div>
        </x-tab>
      </x-tabs>
    </div>

    <div class="row">
      <x-radio [style.margin-bottom.rem]="1" [data]="radios" [(ngModel)]="layout" (ngModelChange)="change($event)" button></x-radio>
    </div>
    <div class="row">
      <x-tabs [layout]="layout">
        <x-tab *ngFor="let label of labels" [label]="label">
          <div class="tab-content">{{ label }}</div>
        </x-tab>
      </x-tabs>
    </div>
    <div class="row">
      <x-tabs type="tag" [layout]="layout">
        <x-tab *ngFor="let label of labels" [label]="label">
          <div class="tab-content">{{ label }}</div>
        </x-tab>
      </x-tabs>
    </div>
    <div class="row">
      <x-tabs type="card" [layout]="layout">
        <x-tab *ngFor="let label of labels" [label]="label">
          <div class="tab-content">{{ label }}</div>
        </x-tab>
      </x-tabs>
    </div>
    <div class="row">
      <x-tabs type="card" [layout]="layout">
        <x-tab [label]="labelTpl1">
          <ng-template #labelTpl1>
            <x-icon type="fto-box" [style.margin-right.rem]="0.125"></x-icon>
            <span>用户管理</span>
          </ng-template>
          <div class="tab-content">用户管理</div>
        </x-tab>
        <x-tab [label]="labelTpl2">
          <ng-template #labelTpl2>
            <x-icon type="fto-settings" [style.margin-right.rem]="0.125"></x-icon>
            <span>配置管理</span>
          </ng-template>
          <div class="tab-content">配置管理</div>
        </x-tab>
        <x-tab label="角色管理">
          <div class="tab-content">角色管理</div>
        </x-tab>
        <x-tab label="任务">
          <div class="tab-content">任务</div>
        </x-tab>
      </x-tabs>
    </div>
  `,
  styles: [
    `
      .row:not(:first-child) {
        margin-top: 1rem;
      }
      .tab-content {
        padding: 0.625rem;
      }
    `
  ]
})
class TestXTabsComponent {
  labels = ['用户管理', '配置管理', '角色管理', '任务'];
  radios = ['top', 'right', 'bottom', 'left'];
  layout: XTabsLayout = 'top';

  customLabels = ['用户管理', '配置管理', '角色管理', '任务'];
  constructor(private cdr: ChangeDetectorRef) {}

  change(event) {
    this.cdr.detectChanges();
  }
}
