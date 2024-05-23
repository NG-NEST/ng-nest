import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, ChangeDetectorRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XTabsComponent, XTabComponent } from '@ng-nest/ui/tabs';
import { XTabsPrefix, XTabsLayout } from './tabs.property';
import { XRadioComponent } from '@ng-nest/ui/radio';
import { FormsModule } from '@angular/forms';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XJustify } from '@ng-nest/ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XThemeComponent } from '@ng-nest/ui/theme';
import { XButtonComponent } from '@ng-nest/ui/button';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe(XTabsPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    declarations: [TestXTabsComponent],
    imports: [BrowserAnimationsModule,
        XThemeComponent,
        FormsModule,
        XTabsComponent,
        XTabComponent,
        XRadioComponent,
        XIconComponent,
        XButtonComponent],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();
  });
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXTabsComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXTabsComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XTabsComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  selector: 'test-x-tabs',
  template: `
    <x-theme showDark></x-theme>
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
      <x-radio [data]="justifyRadios" [(ngModel)]="justify" (ngModelChange)="change()" button></x-radio>
    </div>
    <div class="row">
      <x-radio [data]="layoutRadios" [(ngModel)]="layout" (ngModelChange)="change()" button></x-radio>
    </div>
    <div class="row">
      <x-tabs [layout]="layout" [justify]="justify">
        <x-tab *ngFor="let label of labels" [label]="label">
          <div class="tab-content">{{ label }}</div>
        </x-tab>
      </x-tabs>
    </div>
    <div class="row">
      <x-tabs type="tag" [layout]="layout" [justify]="justify">
        <x-tab *ngFor="let label of labels" [label]="label">
          <div class="tab-content">{{ label }}</div>
        </x-tab>
      </x-tabs>
    </div>
    <div class="row">
      <x-tabs type="card" [layout]="layout" [justify]="justify">
        <x-tab *ngFor="let label of labels" [label]="label">
          <div class="tab-content">{{ label }}</div>
        </x-tab>
      </x-tabs>
    </div>
    <div class="row">
      <x-tabs type="card" [layout]="layout" [justify]="justify">
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
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
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
  layoutRadios = ['top', 'right', 'bottom', 'left'];
  layout: XTabsLayout = 'top';
  justifyRadios = ['start', 'center', 'end'];
  justify: XJustify = 'start';

  customLabels = ['用户管理', '配置管理', '角色管理', '任务'];
  constructor(private cdr: ChangeDetectorRef) {}

  change() {
    this.cdr.detectChanges();
  }
}
