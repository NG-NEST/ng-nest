import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
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
import { XButtonComponent } from '@ng-nest/ui/button';

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
      [(active)]="active"
      [height]="height()"
      [trigger]="trigger()"
      [arrow]="arrow()"
      [direction]="direction()"
    >
      <x-carousel-panel>1</x-carousel-panel>
      <x-carousel-panel>2</x-carousel-panel>
      <x-carousel-panel>3</x-carousel-panel>
    </x-carousel>
  `
})
class XTestCarouselPropertyComponent {
  active = signal(0);
  height = signal('15rem');
  trigger = signal<XCarouselTrigger>('hover');
  arrow = signal<XCarouselArrow>('hover');
  direction = signal<XCarouselDirection>('horizontal');
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
    let carousel: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestCarouselComponent);
      carousel = fixture.debugElement.query(By.css('.x-carousel'));
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XCarouselComponent));
      expect(com).toBeDefined();
    });
    it('property.', () => {
      const indicator = fixture.debugElement.query(By.css('.x-carousel-indicator'));
      const list = indicator.queryAll(By.css('li'));
      expect(list[0].nativeElement).toHaveClass('x-activated');

      const content = fixture.debugElement.query(By.css('.x-carousel-content'));
      expect(content.nativeElement.style.height).toBe('15rem');

      list[1].nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
      fixture.detectChanges();
      expect(list[1].nativeElement).toHaveClass('x-activated');

      carousel.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
      fixture.detectChanges();
      const button = content.query(By.directive(XButtonComponent));
      expect(button.nativeElement.style.opacity).toBe(1);

      expect(carousel.nativeElement).toHaveClass('x-carousel-horizontal');
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestCarouselPropertyComponent>;
    let component: XTestCarouselPropertyComponent;
    let carousel: DebugElement;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestCarouselPropertyComponent);
      component = fixture.componentInstance;
      carousel = fixture.debugElement.query(By.css('.x-carousel'));
      fixture.detectChanges();
    });
    it('active.', () => {
      const indicator = fixture.debugElement.query(By.css('.x-carousel-indicator'));
      const list = indicator.queryAll(By.css('li'));
      expect(list[0].nativeElement).toHaveClass('x-activated');

      component.active.set(1);
      fixture.detectChanges();
      expect(list[1].nativeElement).toHaveClass('x-activated');
    });
    it('height.', () => {
      component.height.set('150px');
      fixture.detectChanges();
      const content = fixture.debugElement.query(By.css('.x-carousel-content'));
      expect(content.nativeElement.style.height).toBe('150px');
    });
    it('trigger.', () => {
      const indicator = fixture.debugElement.query(By.css('.x-carousel-indicator'));
      const list = indicator.queryAll(By.css('li'));
      list[1].nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
      fixture.detectChanges();
      expect(list[1].nativeElement).toHaveClass('x-activated');

      component.trigger.set('click');
      fixture.detectChanges();
      list[2].nativeElement.click();
      fixture.detectChanges();
      expect(list[2].nativeElement).toHaveClass('x-activated');
    });
    it('arrow.', () => {
      component.arrow.set('always');
      fixture.detectChanges();
      const content = fixture.debugElement.query(By.css('.x-carousel-content'));
      const button = content.query(By.directive(XButtonComponent));
      expect(button.nativeElement.style.opacity).toBe(1);
    });
    it('direction.', () => {
      component.direction.set('vertical');
      fixture.detectChanges();
      expect(carousel.nativeElement).toHaveClass('x-carousel-horizontal');
    });
  });
});
