import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XPageHeaderComponent } from '@ng-nest/ui/page-header';
import { XPageHeaderPrefix } from './page-header.property';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe(XPageHeaderPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestXPageHeaderComponent],
      imports: [BrowserAnimationsModule,  XPageHeaderComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXPageHeaderComponent>;
    let pageheader: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXPageHeaderComponent);
      fixture.detectChanges();
      pageheader = fixture.debugElement.query(By.directive(XPageHeaderComponent));
    });
    it('should create.', () => {
      expect(pageheader).toBeDefined();
    });
  });
});

@Component({
  template: `
    
    <div class="row">
      <x-page-header title="标题" subTitle="小标题"> </x-page-header>
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
    `
  ]
})
class TestXPageHeaderComponent {}
