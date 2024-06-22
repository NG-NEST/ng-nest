import { XIconComponent } from '@ng-nest/ui/icon';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component, DebugElement, ChangeDetectorRef, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XRowComponent, XColComponent } from '@ng-nest/ui/layout';
import { XEmptyComponent } from '@ng-nest/ui/empty';
import { FormsModule } from '@angular/forms';
import { XEmptyPrefix } from './empty.property';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XContainerComponent } from '@ng-nest/ui/container';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { XI18nService, en_US, zh_CN } from '@ng-nest/ui/i18n';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe(XEmptyPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestXEmptyComponent],
      imports: [
        BrowserAnimationsModule,
        
        FormsModule,
        XEmptyComponent,
        XButtonComponent,
        XContainerComponent,
        XRowComponent,
        XColComponent,
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
    let fixture: ComponentFixture<TestXEmptyComponent>;
    let empty: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXEmptyComponent);
      fixture.detectChanges();
      empty = fixture.debugElement.query(By.directive(XEmptyComponent));
    });
    it('should create.', () => {
      expect(empty).toBeDefined();
    });
  });
});

@Component({
  template: `
    <x-button (click)="english()">切换为英文</x-button>
    <x-button (click)="chinese()">切换为中文</x-button>
    
    <div class="row">
      <x-empty></x-empty>
    </div>
    <div class="row">
      <x-empty img="https://ngnest.com/img/logo/logo-144x144.png"></x-empty>
    </div>
    <div class="row">
      <x-empty content="没有数据了"></x-empty>
    </div>
    <div class="row">
      <x-empty [img]="imgTemp">
        <ng-template #imgTemp><x-icon type="fto-user"></x-icon></ng-template>
      </x-empty>
    </div>
    <div class="row">
      <x-empty [content]="contentTemp">
        <ng-template #contentTemp>
          <span>没有数据</span>
          <x-button type="primary">重新请求</x-button>
        </ng-template>
      </x-empty>
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
        margin-top: 2rem;
      }
      .row x-empty .x-button {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXEmptyComponent {
  constructor(
    private i18nService: XI18nService,
    private cdr: ChangeDetectorRef
  ) {}
  english() {
    this.i18nService.setLocale(en_US);
    this.cdr.detectChanges();
  }

  chinese() {
    this.i18nService.setLocale(zh_CN);
    this.cdr.detectChanges();
  }
}
