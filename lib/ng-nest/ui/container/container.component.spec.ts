import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XContainerComponent } from './container.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XContainerModule } from './container.module';
import { XContainerPrefix } from './container.type';

describe(XContainerPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XContainerModule],
      declarations: [TestXContainerComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXContainerComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXContainerComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XContainerComponent));
      element = debugElement.nativeElement;
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  selector: 'test-x-container',
  template: `
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
      :host > x-container:not(first-child) {
        margin-top: 1rem;
      }
      x-header,
      x-footer {
        line-height: 3rem;
        text-align: center;
        border-radius: 0.125rem;
      }
      x-header {
        background-color: var(--x-info-400);
      }
      x-footer {
        background-color: var(--x-info-800);
      }
      x-main {
        line-height: 12rem;
        text-align: center;
        border-radius: 0.125rem;
        background-color: var(--x-info-900);
      }
      x-aside {
        line-height: 14rem;
        text-align: center;
        border-radius: 0.125rem;
        background-color: var(--x-info-600);
      }
    `
  ]
})
class TestXContainerComponent {}
