import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component, DebugElement, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XAffixComponent } from '@ng-nest/ui/affix';
import { XAffixPrefix } from './affix.property';
import { XButtonComponent } from '@ng-nest/ui/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe(XAffixPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestXAffixComponent],
      imports: [BrowserAnimationsModule, XAffixComponent, XButtonComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXAffixComponent>;
    let affix: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXAffixComponent);
      fixture.detectChanges();
      affix = fixture.debugElement.query(By.directive(XAffixComponent));
    });
    it('should create.', () => {
      expect(affix).toBeDefined();
    });
  });
});

@Component({
  template: `
    <div class="row scroll">
      <x-affix top="0">
        <x-button>滚动条下滑，我将固定到顶部</x-button>
      </x-affix>
      <x-affix top="5rem">
        <x-button>滚动条下滑，我与顶部距离5rem</x-button>
      </x-affix>
    </div>
    <div class="row scroll">
      <div class="box">
        <x-affix top="2rem">
          <x-button>top </x-button>
        </x-affix>
      </div>
    </div>
    <div class="row scroll">
      <div class="box">
        <x-affix left="2rem">
          <x-button>left </x-button>
        </x-affix>
      </div>
    </div>
    <div class="row scroll">
      <div class="box">
        <x-affix top="2rem" left="2rem">
          <x-button>top + left</x-button>
        </x-affix>
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
        height: 50rem;
      }
      .row.scroll {
        height: 12rem;
        width: 12rem;
        overflow: auto;
        border-radius: 0.125rem;
        border: 0.0625rem solid var(--x-border);
      }
      .row .box {
        height: 25rem;
        width: 25rem;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==);
      }
      .row x-affix:not(:first-child) {
        margin-left: 1rem;
      }
      .row:not(:first-child) {
        margin-top: 1rem;
      }
    `
  ]
})
class TestXAffixComponent {}
