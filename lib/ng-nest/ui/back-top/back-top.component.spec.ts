import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XBackTopComponent } from '@ng-nest/ui/back-top';
import { XBackTopPrefix } from './back-top.property';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XTabsModule } from '@ng-nest/ui/tabs';
import { XThemeModule } from '@ng-nest/ui/theme';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe(XBackTopPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        XBackTopComponent,
        XButtonComponent,
        BrowserAnimationsModule,
        XTabsModule,
        XThemeModule
      ],
      declarations: [TestXBackTopComponent, TestXBackTopTabsComponent]
    }).compileComponents();
  });
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXBackTopComponent>;
    let backTop: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXBackTopComponent);
      fixture.detectChanges();
      backTop = fixture.debugElement.query(By.directive(XBackTopComponent));
    });
    it('should create.', () => {
      expect(backTop).toBeDefined();
    });
  });
  describe(`tabs.`, () => {
    let fixture: ComponentFixture<TestXBackTopTabsComponent>;
    let backTop: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXBackTopTabsComponent);
      fixture.detectChanges();
      backTop = fixture.debugElement.query(By.directive(XBackTopComponent));
    });
    it('should create.', () => {
      expect(backTop).toBeDefined();
    });
  });
});

@Component({
  template: `
    <x-theme showDark></x-theme>
    <div class="row">
      <x-back-top> </x-back-top>
      <x-back-top [template]="templateTpl" bottom="6rem" visibilityHeight="100"> </x-back-top>
      <ng-template #templateTpl>
        <div class="custom-template">UP</div>
      </ng-template>
      <div #scroll class="scroll">
        <div class="box">
          <x-back-top right="6rem" [target]="scroll"> </x-back-top>
          <x-button *ngFor="let button of buttons">{{ button }}</x-button>
        </div>
      </div>
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
        height: 100rem;
      }
      .row:not(:first-child) {
        margin-top: 1rem;
      }
      .scroll {
        width: 15rem;
        height: 15rem;
        overflow: auto;
      }
      .scroll .box {
        height: 60rem;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==);
      }
      .scroll .box x-button {
        margin-top: 1rem;
      }
      .custom-template {
        width: 2.5rem;
        height: 2.5rem;
        line-height: 2.5rem;
        text-align: center;
        border-radius: 0.125rem;
        background-color: var(--x-background);
        color: var(--x-primary);
        font-size: 1.25rem;
        cursor: pointer;
        box-shadow: 0 0.125rem 0.75rem 0 rgba(0, 0, 0, 0.1);
        border: 0.0625rem solid var(--x-border-200);
      }
      .custom-template:hover {
        background-color: var(--x-primary-900);
      }
    `
  ]
})
class TestXBackTopComponent {
  buttons = Array.from({ length: 20 }).map((_x, i) => `按钮 ${i + 1}`);
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <div class="row">
      <x-tabs>
        <x-tab label="1111">
          <x-back-top> </x-back-top>
        </x-tab>
        <x-tab label="2222">
          <x-back-top right="6rem"> </x-back-top>
        </x-tab>
        <x-tab label="3333">
          <x-back-top right="12rem"> </x-back-top>
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
      .row {
        height: 100rem;
      }
    `
  ]
})
class TestXBackTopTabsComponent {}
