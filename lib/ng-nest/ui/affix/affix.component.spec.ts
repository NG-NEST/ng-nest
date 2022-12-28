import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XAffixComponent } from './affix.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XAffixModule } from '@ng-nest/ui/affix';
import { XAffixPrefix } from './affix.property';
import { XButtonModule } from '@ng-nest/ui/button';
import { XThemeModule } from '@ng-nest/ui/theme';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe(XAffixPrefix, () => {
  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, HttpClientTestingModule, XAffixModule, XButtonModule, XThemeModule],
      declarations: [TestXAffixComponent]
    }).compileComponents();
  }));
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
    <x-theme showDark></x-theme>
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
