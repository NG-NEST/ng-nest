import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XContainerComponent } from './container.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XContainerModule } from '@ng-nest/ui/container';
import { XContainerPrefix } from './container.property';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XThemeModule } from '@ng-nest/ui/theme';

describe(XContainerPrefix, () => {
  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, XThemeModule, XContainerModule],
      declarations: [TestXContainerComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXContainerComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXContainerComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XContainerComponent));
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  selector: 'test-x-container',
  template: `
    <x-theme showDark></x-theme>
    <x-container>
      <x-header>Header</x-header>
      <x-main>Main</x-main>
    </x-container>
    <x-container>
      <x-header>Header</x-header>
      <x-main>Main</x-main>
      <x-footer>Footer</x-footer>
    </x-container>
    <x-container>
      <x-aside>Aside</x-aside>
      <x-main>Main</x-main>
    </x-container>
    <x-container>
      <x-header>Header</x-header>
      <x-container>
        <x-aside>Aside</x-aside>
        <x-main>Main</x-main>
      </x-container>
    </x-container>
    <x-container>
      <x-header>Header</x-header>
      <x-container>
        <x-aside>Aside</x-aside>
        <x-container>
          <x-main>Main</x-main>
          <x-header>footer</x-header>
        </x-container>
      </x-container>
    </x-container>
    <x-container>
      <x-aside>Aside</x-aside>
      <x-container>
        <x-header>Header</x-header>
        <x-main>Main</x-main>
      </x-container>
    </x-container>
    <x-container>
      <x-aside>Aside</x-aside>
      <x-container>
        <x-header>Header</x-header>
        <x-main>Main</x-main>
        <x-header>footer</x-header>
      </x-container>
    </x-container>
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      :host > x-container:not(first-child) {
        margin-top: 1rem;
      }
      x-header,
      x-footer {
        line-height: 3rem;
        text-align: center;
      }
      x-header {
        background-color: var(--x-info-200);
      }
      x-footer {
        background-color: var(--x-info-300);
      }
      x-main {
        line-height: 12rem;
        text-align: center;
        background-color: var(--x-info-400);
      }
      x-aside {
        line-height: 14rem;
        text-align: center;
        background-color: var(--x-info-500);
      }
    `
  ]
})
class TestXContainerComponent {}
