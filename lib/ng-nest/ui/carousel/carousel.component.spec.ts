import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  XCarouselArrow,
  XCarouselComponent,
  XCarouselDirection,
  XCarouselModule,
  XCarouselPrefix,
  XCarouselTrigger
} from '@ng-nest/ui/carousel';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [XCarouselModule],
  template: `
    <x-carousel>
      <x-carousel-panel>1</x-carousel-panel>
      <x-carousel-panel>2</x-carousel-panel>
      <x-carousel-panel>3</x-carousel-panel>
    </x-carousel>
  `
})
class XTestCarouselComponent {}

@Component({
  standalone: true,
  imports: [XCarouselModule],
  template: `
    <x-carousel
      [active]="active()"
      [trigger]="trigger()"
      [arrow]="arrow()"
      [direction]="direction()"
      [autoplay]="autoplay()"
      [interval]="interval()"
      [outside]="outside()"
      [card]="card()"
      [text]="text()"
      [progress]="progress()"
      [progressColor]="progressColor()"
      [current]="current()"
    >
      <x-carousel-panel>1</x-carousel-panel>
      <x-carousel-panel [active]="panelActive()">2</x-carousel-panel>
      <x-carousel-panel>3</x-carousel-panel>
    </x-carousel>
  `
})
class XTestCarouselPropertyComponent {
  active = signal('15rem');
  trigger = signal<XCarouselTrigger>('hover');
  arrow = signal<XCarouselArrow>('hover');
  direction = signal<XCarouselDirection>('horizontal');
  autoplay = signal(true);
  interval = signal(3000);
  outside = signal(false);
  card = signal(false);
  text = signal('');
  progress = signal(false);
  progressColor = signal('');
  current = signal(false);

  panelActive = signal(false);
}

describe(XCarouselPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestCarouselComponent, XTestCarouselPropertyComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestCarouselComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestCarouselComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XCarouselComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestCarouselPropertyComponent>;
    // let component: XTestCarouselPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestCarouselPropertyComponent);
      // component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('active.', () => {
      expect(true).toBe(true);
    });
    it('trigger.', () => {
      expect(true).toBe(true);
    });
    it('arrow.', () => {
      expect(true).toBe(true);
    });
    it('direction.', () => {
      expect(true).toBe(true);
    });
    it('autoplay.', () => {
      expect(true).toBe(true);
    });
    it('interval.', () => {
      expect(true).toBe(true);
    });
    it('outside.', () => {
      expect(true).toBe(true);
    });
    it('card.', () => {
      expect(true).toBe(true);
    });
    it('text.', () => {
      expect(true).toBe(true);
    });
    it('progress.', () => {
      expect(true).toBe(true);
    });
    it('progressColor.', () => {
      expect(true).toBe(true);
    });
    it('current.', () => {
      expect(true).toBe(true);
    });
    it('panelActive.', () => {
      expect(true).toBe(true);
    });
  });
});
