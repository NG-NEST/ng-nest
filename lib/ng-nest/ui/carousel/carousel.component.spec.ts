import { XIconModule } from '@ng-nest/ui/icon';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XCarouselComponent } from './carousel.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XLayoutModule } from '@ng-nest/ui/layout';
import { XCarouselModule } from '@ng-nest/ui/carousel';
import { FormsModule } from '@angular/forms';
import { XCarouselPrefix } from './carousel.property';
import { XButtonModule } from '@ng-nest/ui/button';
import { XContainerModule } from '@ng-nest/ui/container';
import { XTabsModule } from '@ng-nest/ui/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XThemeModule } from '@ng-nest/ui/theme';

describe(XCarouselPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        XThemeModule,
        FormsModule,
        XCarouselModule,
        XButtonModule,
        XContainerModule,
        XLayoutModule,
        XIconModule,
        XTabsModule
      ],
      declarations: [TestXCarouselComponent, TestXCarouselCardComponent, TestXCarouselDirectionComponent, TestXCarouselTabsComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXCarouselComponent>;
    let carousel: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXCarouselComponent);
      fixture.detectChanges();
      carousel = fixture.debugElement.query(By.directive(XCarouselComponent));
    });
    it('should create.', () => {
      expect(carousel).toBeDefined();
    });
  });
  describe(`card.`, () => {
    let fixture: ComponentFixture<TestXCarouselCardComponent>;
    let carousel: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXCarouselCardComponent);
      fixture.detectChanges();
      carousel = fixture.debugElement.query(By.directive(XCarouselComponent));
    });
    it('should create.', () => {
      expect(carousel).toBeDefined();
    });
  });
  describe(`direction.`, () => {
    let fixture: ComponentFixture<TestXCarouselDirectionComponent>;
    let carousel: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXCarouselDirectionComponent);
      fixture.detectChanges();
      carousel = fixture.debugElement.query(By.directive(XCarouselComponent));
    });
    it('should create.', () => {
      expect(carousel).toBeDefined();
    });
  });
  describe(`tabs.`, () => {
    let fixture: ComponentFixture<TestXCarouselTabsComponent>;
    let carousel: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXCarouselTabsComponent);
      fixture.detectChanges();
      carousel = fixture.debugElement.query(By.directive(XCarouselComponent));
    });
    it('should create.', () => {
      expect(carousel).toBeDefined();
    });
  });
});

@Component({
  template: `
    <x-theme showDark></x-theme>
    <div class="row">
      <x-carousel height="12rem">
        <x-carousel-panel *ngFor="let item of list">
          <h3>{{ item }}</h3>
        </x-carousel-panel>
      </x-carousel>
    </div>
    <div class="row">
      <x-carousel height="12rem" trigger="click">
        <x-carousel-panel *ngFor="let item of list">
          <h3>{{ item }}</h3>
        </x-carousel-panel>
      </x-carousel>
    </div>
    <div class="row">
      <x-carousel height="12rem" outside>
        <x-carousel-panel *ngFor="let item of list">
          <h3>{{ item }}</h3>
        </x-carousel-panel>
      </x-carousel>
    </div>
    <div class="row">
      <x-carousel height="12rem" arrow="always">
        <x-carousel-panel *ngFor="let item of list">
          <h3>{{ item }}</h3>
        </x-carousel-panel>
      </x-carousel>
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
        width: 24rem;
        padding: 1.625rem 1rem;
        border: 0.0625rem solid var(--x-border);
        background-color: var(--x-background);
      }
      .row:not(:first-child) {
        margin-top: 2rem;
      }
      .row x-carousel-panel:nth-child(odd) {
        background-color: var(--x-info-800);
      }
      .row x-carousel-panel:nth-child(even) {
        background-color: var(--x-info-600);
      }
      .row x-carousel-panel h3 {
        text-align: center;
        line-height: 12rem;
        margin: 0;
        color: var(--x-text-300);
      }
    `
  ]
})
class TestXCarouselComponent {
  list = [1, 2, 3, 4, 5];
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <div class="row">
      <x-carousel height="15rem" card>
        <x-carousel-panel *ngFor="let item of list">
          <h3>{{ item }}</h3>
        </x-carousel-panel>
      </x-carousel>
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
        width: 100%;
        padding: 1.625rem 1rem;
        border: 0.0625rem solid var(--x-border);
        background-color: var(--x-background);
      }
      .row:not(:first-child) {
        margin-top: 2rem;
      }
      .row x-carousel-panel:nth-child(odd) {
        background-color: var(--x-info-800);
      }
      .row x-carousel-panel:nth-child(even) {
        background-color: var(--x-info-600);
      }
      .row x-carousel-panel h3 {
        text-align: center;
        line-height: 15rem;
        margin: 0;
        color: var(--x-text-300);
      }
    `
  ]
})
class TestXCarouselCardComponent {
  list = [1, 2, 3, 4, 5];
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <div class="row">
      <x-carousel height="15rem" direction="vertical">
        <x-carousel-panel *ngFor="let item of list">
          <h3>{{ item }}</h3>
        </x-carousel-panel>
      </x-carousel>
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
        width: 100%;
        padding: 1.625rem 1rem;
        border: 0.0625rem solid var(--x-border);
        background-color: var(--x-background);
      }
      .row:not(:first-child) {
        margin-top: 2rem;
      }
      .row x-carousel-panel:nth-child(odd) {
        background-color: var(--x-info-800);
      }
      .row x-carousel-panel:nth-child(even) {
        background-color: var(--x-info-600);
      }
      .row x-carousel-panel h3 {
        text-align: center;
        line-height: 15rem;
        margin: 0;
        color: var(--x-text-300);
      }
    `
  ]
})
class TestXCarouselDirectionComponent {
  list = [1, 2, 3, 4, 5];
}

@Component({
  template: `
    <x-theme showDark></x-theme>
    <div class="row">
      <x-tabs>
        <x-tab label="1111">
          <x-carousel height="15rem" card>
            <x-carousel-panel *ngFor="let item of list">
              <h3>{{ item }}</h3>
            </x-carousel-panel>
          </x-carousel>
        </x-tab>
        <x-tab label="2222">
          <x-carousel height="15rem" card>
            <x-carousel-panel *ngFor="let item of list">
              <h3>{{ item }}</h3>
            </x-carousel-panel>
          </x-carousel>
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
        width: 100%;
        padding: 1.625rem 1rem;
        border: 0.0625rem solid var(--x-border);
        background-color: var(--x-background);
      }
      .row:not(:first-child) {
        margin-top: 2rem;
      }
      .row x-carousel-panel:nth-child(odd) {
        background-color: var(--x-info-800);
      }
      .row x-carousel-panel:nth-child(even) {
        background-color: var(--x-info-600);
      }
      .row x-carousel-panel h3 {
        text-align: center;
        line-height: 15rem;
        margin: 0;
        color: var(--x-text-300);
      }
    `
  ]
})
class TestXCarouselTabsComponent {
  list = [1, 2, 3, 4, 5];
}
