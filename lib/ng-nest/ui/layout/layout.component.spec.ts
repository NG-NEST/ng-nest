import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { XRowPrefix } from './layout.property';
import { XRowComponent } from './row.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XThemeModule } from '@ng-nest/ui/theme';

describe(`${XRowPrefix}`, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, XThemeModule, XLayoutModule],
      declarations: [
        TestLayoutComponent,
        TestSpaceLayoutComponent,
        TestBlendLayoutComponent,
        TestOffsetLayoutComponent,
        TestFlexLayoutComponent,
        TestLayoutLayoutComponent,
        TestHiddenLayoutComponent
      ]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestLayoutComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestLayoutComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XRowComponent));
      element = debugElement.nativeElement;
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`space.`, () => {
    let fixture: ComponentFixture<TestSpaceLayoutComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestSpaceLayoutComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XRowComponent));
      element = debugElement.nativeElement;
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`blend.`, () => {
    let fixture: ComponentFixture<TestBlendLayoutComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestBlendLayoutComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XRowComponent));
      element = debugElement.nativeElement;
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`offset.`, () => {
    let fixture: ComponentFixture<TestOffsetLayoutComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestOffsetLayoutComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XRowComponent));
      element = debugElement.nativeElement;
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`flex.`, () => {
    let fixture: ComponentFixture<TestFlexLayoutComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestFlexLayoutComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XRowComponent));
      element = debugElement.nativeElement;
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`layout.`, () => {
    let fixture: ComponentFixture<TestLayoutLayoutComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestLayoutLayoutComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XRowComponent));
      element = debugElement.nativeElement;
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
  describe(`hidden.`, () => {
    let fixture: ComponentFixture<TestHiddenLayoutComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestHiddenLayoutComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XRowComponent));
      element = debugElement.nativeElement;
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  selector: 'test-x-layout',
  template: `
    <x-theme showDark></x-theme>
    <x-row>
      <x-col span="12">col-12</x-col>
      <x-col span="12">col-12</x-col>
    </x-row>
    <x-row>
      <x-col span="8">col-8</x-col>
      <x-col span="8">col-8</x-col>
      <x-col span="8">col-8</x-col>
    </x-row>
    <x-row>
      <x-col span="6">col-6</x-col>
      <x-col span="6">col-6</x-col>
      <x-col span="6">col-6</x-col>
      <x-col span="6">col-6</x-col>
    </x-row>
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      x-row {
        margin: 1rem 0;
      }
      x-row > x-col {
        color: var(--x-text);
        padding: 1rem;
        text-align: center;
        border-radius: 0.125rem;
      }
      x-row > x-col:nth-child(odd) {
        background-color: var(--x-info-400);
      }
      x-row > x-col:nth-child(even) {
        background-color: var(--x-info-500);
      }
    `
  ]
})
class TestLayoutComponent {}

@Component({
  selector: 'test-space-x-layout',
  template: `
    <x-theme showDark></x-theme>
    <x-row space="1">
      <x-col span="12"><div>col-12</div></x-col>
      <x-col span="12"><div>col-12</div></x-col>
    </x-row>
    <x-row space="2">
      <x-col span="8"><div>col-8</div></x-col>
      <x-col span="8"><div>col-8</div></x-col>
      <x-col span="8"><div>col-8</div></x-col>
    </x-row>
    <x-row space="3">
      <x-col span="6"><div>col-6</div></x-col>
      <x-col span="6"><div>col-6</div></x-col>
      <x-col span="6"><div>col-6</div></x-col>
      <x-col span="6"><div>col-6</div></x-col>
    </x-row>
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      x-row {
        margin: 1rem 0;
      }
      x-row > x-col > div {
        color: var(--x-text);
        padding: 1rem;
        text-align: center;
        border-radius: 0.125rem;
      }
      x-row > x-col:nth-child(odd) > div {
        background-color: var(--x-info-400);
      }
      x-row > x-col:nth-child(even) > div {
        background-color: var(--x-info-500);
      }
    `
  ]
})
class TestSpaceLayoutComponent {}

@Component({
  selector: 'test-blend-x-layout',
  template: `
    <x-theme showDark></x-theme>
    <x-row space="1">
      <x-col span="12"><div>col-12</div></x-col>
      <x-col span="6"><div>col-6</div></x-col>
      <x-col span="6"><div>col-6</div></x-col>
    </x-row>
    <x-row space="1">
      <x-col span="8"><div>col-8</div></x-col>
      <x-col span="8"><div>col-8</div></x-col>
      <x-col span="4"><div>col-4</div></x-col>
      <x-col span="4"><div>col-4</div></x-col>
    </x-row>
    <x-row space="1">
      <x-col span="4"><div>col-4</div></x-col>
      <x-col span="20"><div>col-20</div></x-col>
    </x-row>
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      x-row {
        margin: 1rem 0;
      }
      x-row > x-col > div {
        color: var(--x-text);
        padding: 1rem;
        text-align: center;
        border-radius: 0.125rem;
      }
      x-row > x-col:nth-child(odd) > div {
        background-color: var(--x-info-400);
      }
      x-row > x-col:nth-child(even) > div {
        background-color: var(--x-info-500);
      }
    `
  ]
})
class TestBlendLayoutComponent {}

@Component({
  selector: 'test-offset-x-layout',
  template: `
    <x-theme showDark></x-theme>
    <x-row space="1">
      <x-col span="6"><div>col-6</div></x-col>
      <x-col span="6" offset="6"><div>col-6</div></x-col>
    </x-row>
    <x-row space="1">
      <x-col span="6" offset="6"><div>col-6</div></x-col>
      <x-col span="6" offset="6"><div>col-6</div></x-col>
    </x-row>
    <x-row space="1">
      <x-col span="18" offset="6"><div>col-18</div></x-col>
    </x-row>
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      x-row {
        margin: 1rem 0;
      }
      x-row > x-col > div {
        color: var(--x-text);
        padding: 1rem;
        text-align: center;
        border-radius: 0.125rem;
      }
      x-row > x-col:nth-child(odd) > div {
        background-color: var(--x-info-400);
      }
      x-row > x-col:nth-child(even) > div {
        background-color: var(--x-info-500);
      }
    `
  ]
})
class TestOffsetLayoutComponent {}

@Component({
  selector: 'test-flex-x-layout',
  template: `
    <x-theme showDark></x-theme>
    <x-row justify="start">
      <x-col span="6"><div>col-6</div></x-col>
      <x-col span="6"><div>col-6</div></x-col>
      <x-col span="6"><div>col-6</div></x-col>
    </x-row>
    <x-row justify="end">
      <x-col span="6"><div>col-6</div></x-col>
      <x-col span="6"><div>col-6</div></x-col>
      <x-col span="6"><div>col-6</div></x-col>
    </x-row>
    <x-row justify="center">
      <x-col span="6"><div>col-6</div></x-col>
      <x-col span="6"><div>col-6</div></x-col>
      <x-col span="6"><div>col-6</div></x-col>
    </x-row>
    <x-row justify="space-around">
      <x-col span="6"><div>col-6</div></x-col>
      <x-col span="6"><div>col-6</div></x-col>
      <x-col span="6"><div>col-6</div></x-col>
    </x-row>
    <x-row justify="space-between">
      <x-col span="6"><div>col-6</div></x-col>
      <x-col span="6"><div>col-6</div></x-col>
      <x-col span="6"><div>col-6</div></x-col>
    </x-row>
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      x-row {
        margin: 1rem 0;
      }
      x-row > x-col > div {
        color: var(--x-text);
        padding: 1rem;
        text-align: center;
        border-radius: 0.125rem;
      }
      x-row > x-col:nth-child(odd) > div {
        background-color: var(--x-info-400);
      }
      x-row > x-col:nth-child(even) > div {
        background-color: var(--x-info-500);
      }
    `
  ]
})
class TestFlexLayoutComponent {}

@Component({
  selector: 'test-layout-x-layout',
  template: `
    <x-theme showDark></x-theme>
    <x-row space="1">
      <x-col xs="8" sm="6" md="4" lg="3" xl="1">
        <div></div>
      </x-col>
      <x-col xs="4" sm="6" md="8" lg="9" xl="11">
        <div></div>
      </x-col>
      <x-col xs="4" sm="6" md="8" lg="9" xl="11">
        <div></div>
      </x-col>
      <x-col xs="8" sm="6" md="4" lg="3" xl="1">
        <div></div>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      x-row {
        margin: 1rem 0;
      }
      x-row > x-col > div {
        color: var(--x-text);
        padding: 1rem;
        text-align: center;
        border-radius: 0.125rem;
      }
      x-row > x-col:nth-child(odd) > div {
        background-color: var(--x-info-400);
      }
      x-row > x-col:nth-child(even) > div {
        background-color: var(--x-info-500);
      }
    `
  ]
})
class TestLayoutLayoutComponent {}

@Component({
  selector: 'test-hidden-x-layout',
  template: `
    <x-theme showDark></x-theme>
    <x-row space="1">
      <x-col span="6" x-hidden-sm-only>
        <div>hidden-xs-only</div>
      </x-col>
    </x-row>
    <x-row space="1">
      <x-col span="6" x-hidden-sm-only>
        <div>hidden-sm-only</div>
      </x-col>
      <x-col span="6" x-hidden-sm-and-down>
        <div>hidden-sm-and-down</div>
      </x-col>
      <x-col span="6" x-hidden-sm-and-up>
        <div>hidden-sm-and-up</div>
      </x-col>
    </x-row>
    <x-row space="1">
      <x-col span="6" x-hidden-md-only>
        <div>hidden-md-only</div>
      </x-col>
      <x-col span="6" x-hidden-md-and-down>
        <div>hidden-md-and-down</div>
      </x-col>
      <x-col span="6" x-hidden-md-and-up>
        <div>hidden-md-and-up</div>
      </x-col>
    </x-row>
    <x-row space="1">
      <x-col span="6" x-hidden-lg-only>
        <div>hidden-lg-only</div>
      </x-col>
      <x-col span="6" x-hidden-lg-and-down>
        <div>hidden-lg-and-down</div>
      </x-col>
      <x-col span="6" x-hidden-lg-and-up>
        <div>hidden-lg-and-up</div>
      </x-col>
    </x-row>
    <x-row space="1">
      <x-col span="6" x-hidden-xl-only>
        <div>hidden-xl-only</div>
      </x-col>
    </x-row>
  `,
  styles: [
    `
      :host {
        background-color: var(--x-background);
        padding: 1rem;
        border: 0.0625rem solid var(--x-border);
      }
      x-row {
        margin: 1rem 0;
      }
      x-row > x-col > div {
        color: var(--x-text);
        padding: 1rem;
        text-align: center;
        border-radius: 0.125rem;
      }
      x-row > x-col:nth-child(odd) > div {
        background-color: var(--x-info-400);
      }
      x-row > x-col:nth-child(even) > div {
        background-color: var(--x-info-500);
      }
    `
  ]
})
class TestHiddenLayoutComponent {}
