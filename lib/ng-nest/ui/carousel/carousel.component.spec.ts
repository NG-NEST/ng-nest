import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideZonelessChangeDetection, signal, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  XCarouselArrow,
  XCarouselComponent,
  XCarouselDirection,
  XCarouselModule,
  XCarouselPanelComponent,
  XCarouselPrefix,
  XCarouselTrigger
} from '@ng-nest/ui/carousel';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { XSleep } from '@ng-nest/ui/core';

@Component({
  selector: 'x-test-carousel',
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
  selector: 'x-test-carousel-property',
  imports: [XCarouselModule],
  template: `
    <x-carousel
      [(active)]="active"
      [height]="height()"
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
  autoplay = signal(true);
  interval = signal(3000);
  outside = signal(false);
  card = signal(false);
  text = signal('');
  progress = signal(false);
  progressColor = signal('');
  current = signal(false);

  carouselPanelActive = viewChild.required<XCarouselComponent>('carouselPanelActive');
}
@Component({
  selector: 'x-test-carousel-panel',
  imports: [XCarouselModule],
  template: ` <x-carousel-panel>1</x-carousel-panel> `
})
class XTestCarouselPanelComponent {}

xdescribe(XCarouselPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestCarouselComponent, XTestCarouselPropertyComponent, XTestCarouselPanelComponent],
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  xdescribe('default.', () => {
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
  xdescribe('panel.', () => {
    let fixture: ComponentFixture<XTestCarouselPanelComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestCarouselPanelComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XCarouselPanelComponent));
      expect(com).toBeDefined();

      fixture.destroy();
    });
  });
  xdescribe(`input.`, async () => {
    let fixture: ComponentFixture<XTestCarouselPropertyComponent>;
    let component: XTestCarouselPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestCarouselPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('active.', () => {
      const ul = fixture.debugElement.query(By.css('.x-carousel-indicator'));
      const lis = ul.nativeElement.querySelectorAll('li');
      expect(lis[0]).toHaveClass('x-activated');

      component.active.set(1);
      fixture.detectChanges();
      expect(lis[1]).toHaveClass('x-activated');
    });
    it('height.', () => {
      const content = fixture.debugElement.query(By.css('.x-carousel-content'));
      expect(content.nativeElement.style.height).toBe('15rem');

      component.height.set('20rem');
      fixture.detectChanges();
      expect(content.nativeElement.style.height).toBe('20rem');
    });
    it('trigger.', () => {
      const ul = fixture.debugElement.query(By.css('.x-carousel-indicator'));
      const lis = ul.nativeElement.querySelectorAll('li');
      lis[1].dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      expect(lis[1]).toHaveClass('x-activated');

      component.trigger.set('click');
      fixture.detectChanges();
      lis[2].dispatchEvent(new Event('click'));
      fixture.detectChanges();
      expect(lis[2]).toHaveClass('x-activated');
    });
    it('arrow.', async () => {
      const arrow = fixture.debugElement.query(By.css('.arrow-left'));
      let style = getComputedStyle(arrow.nativeElement);
      expect(style.opacity).toBe('0');
    });
    it('arrow always.', () => {
      component.arrow.set('always');
      fixture.detectChanges();
      const arrow = fixture.debugElement.query(By.css('.arrow-left'));
      let style = getComputedStyle(arrow.nativeElement);
      expect(style.opacity).toBe('1');
    });
    it('direction.', () => {
      const carousel = fixture.debugElement.query(By.css('.x-carousel'));
      expect(carousel.nativeElement).toHaveClass('x-carousel-horizontal');

      component.direction.set('vertical');
      fixture.detectChanges();
      expect(carousel.nativeElement).toHaveClass('x-carousel-vertical');
    });
    it('autoplay.', async () => {
      await XSleep(component.interval() + 100);
      const ul = fixture.debugElement.query(By.css('.x-carousel-indicator'));
      const lis = ul.nativeElement.querySelectorAll('li');
      expect(lis[1]).toHaveClass('x-activated');
    });
    it('interval.', async () => {
      component.interval.set(4000);
      fixture.detectChanges();
      await XSleep(3100);
      const ul = fixture.debugElement.query(By.css('.x-carousel-indicator'));
      const lis = ul.nativeElement.querySelectorAll('li');
      expect(lis[0]).toHaveClass('x-activated');
      await XSleep(1000);
      expect(lis[1]).toHaveClass('x-activated');
    });
    it('outside.', () => {
      component.outside.set(true);
      fixture.detectChanges();
      const carousel = fixture.debugElement.query(By.css('.x-carousel'));
      expect(carousel.nativeElement).toHaveClass('x-carousel-indicator-outside');
    });
    it('card.', () => {
      component.card.set(true);
      fixture.detectChanges();
      const carousel = fixture.debugElement.query(By.css('.x-carousel'));
      expect(carousel.nativeElement).toHaveClass('x-carousel-indicator-outside');

      const panels = fixture.debugElement.queryAll(By.css('x-carousel-panel'));
      panels.forEach((panel) => {
        expect(panel.nativeElement).toHaveClass('x-carousel-card');
      });
    });
    it('text.', () => {
      component.text.set('text');
      fixture.detectChanges();
      const text = fixture.debugElement.query(By.css('.x-carousel-text'));
      expect(text.nativeElement.innerText).toBe('text');
    });
    it('progress.', () => {
      component.progress.set(true);
      fixture.detectChanges();
      const progress = fixture.debugElement.query(By.css('.x-carousel-progress'));
      expect(progress).toBeDefined();

      const right = fixture.debugElement.query(By.css('.arrow-right'));
      right.nativeElement.click();
    });
    it('progressColor.', () => {
      component.progress.set(true);
      component.progressColor.set('rgb(0, 0, 0)');
      fixture.detectChanges();
      const progressBg = fixture.debugElement.query(By.css('.x-progress-bg'));
      expect(progressBg.nativeElement.style.backgroundColor).toBe('rgb(0, 0, 0)');
    });
    it('current.', () => {
      component.current.set(true);
      fixture.detectChanges();
      const current = fixture.debugElement.query(By.css('.x-carousel-current'));
      expect(current).toBeDefined();
    });
    it('indicator.', async () => {
      const ul = fixture.debugElement.query(By.css('.x-carousel-indicator'));
      const lis = ul.nativeElement.querySelectorAll('li');
      lis[1].click();
      lis[1].dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      await XSleep(100);
      expect(lis[1]).toHaveClass('x-activated');
    });
    it('card active.', async () => {
      component.card.set(true);
      fixture.detectChanges();
      const ul = fixture.debugElement.query(By.css('.x-carousel-indicator'));
      const lis = ul.nativeElement.querySelectorAll('li');
      expect(lis[0]).toHaveClass('x-activated');

      component.active.set(1);
      fixture.detectChanges();
      expect(lis[1]).toHaveClass('x-activated');
    });

    it('card active vertical.', async () => {
      component.card.set(true);
      component.direction.set('vertical');
      fixture.detectChanges();
      const ul = fixture.debugElement.query(By.css('.x-carousel-indicator'));
      const lis = ul.nativeElement.querySelectorAll('li');
      expect(lis[0]).toHaveClass('x-activated');

      component.active.set(1);
      fixture.detectChanges();
      expect(lis[1]).toHaveClass('x-activated');
    });
    it('not card active vertical.', async () => {
      component.direction.set('vertical');
      fixture.detectChanges();
      const ul = fixture.debugElement.query(By.css('.x-carousel-indicator'));
      const lis = ul.nativeElement.querySelectorAll('li');
      expect(lis[0]).toHaveClass('x-activated');

      component.active.set(1);
      fixture.detectChanges();
      expect(lis[1]).toHaveClass('x-activated');
    });
    it('card active click.', async () => {
      component.card.set(true);
      fixture.detectChanges();

      const panel = fixture.debugElement.queryAll(By.css('.x-carousel-panel'));
      panel[2].nativeElement.click();

      const ul = fixture.debugElement.query(By.css('.x-carousel-indicator'));
      const lis = ul.nativeElement.querySelectorAll('li');
      fixture.detectChanges();
      expect(lis[2]).toHaveClass('x-activated');
    });
  });
});
