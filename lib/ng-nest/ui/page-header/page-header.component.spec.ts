import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XPageHeaderComponent } from './page-header.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XPageHeaderModule } from '@ng-nest/ui/page-header';
import { XPageHeaderPrefix } from './page-header.property';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XThemeModule } from '@ng-nest/ui/theme';

describe(XPageHeaderPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, XThemeModule, XPageHeaderModule],
      declarations: [TestXPageHeaderComponent]
    }).compileComponents();
  }));
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
    <x-theme showDark></x-theme>
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
