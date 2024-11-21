import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XLoadingComponent, XLoadingPrefix } from '@ng-nest/ui/loading';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { XBoolean, XComputedStyle, XCorner, XSize } from '@ng-nest/ui/core';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  imports: [XLoadingComponent],
  template: ` <div x-loading></div> `
})
class XTestLoadingComponent {}

@Component({
  imports: [XLoadingComponent],
  template: `
    <div
      [x-loading]="loading()"
      [zIndex]="zIndex()"
      [size]="size()"
      [text]="text()"
      [icon]="icon()"
      [color]="color()"
      [fullScreen]="fullScreen()"
      [radius]="radius()"
      [background]="background()"
    >
      Text
    </div>
  `
})
class XTestLoadingPropertyComponent {
  loading = signal(false);
  zIndex = signal(10);
  size = signal<XSize | number>('medium');
  text = signal('');
  icon = signal('');
  color = signal('');
  fullScreen = signal(false);
  radius = signal<XBoolean | XCorner[] | null>(null);
  background = signal('');
}

describe(XLoadingPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestLoadingComponent, XTestLoadingPropertyComponent],
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideExperimentalZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestLoadingComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestLoadingComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XLoadingComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestLoadingPropertyComponent>;
    let component: XTestLoadingPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestLoadingPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('loading.', () => {
      component.loading.set(true);
      fixture.detectChanges();
      const loading = fixture.debugElement.query(By.css('.x-loading'));
      expect(loading).toBeTruthy();
    });
    it('zIndex.', () => {
      component.loading.set(true);
      component.zIndex.set(1000);
      fixture.detectChanges();
      const loading = fixture.debugElement.query(By.css('.x-loading'));
      const zIndex = Number(XComputedStyle(loading.nativeElement, 'z-index'));
      expect(zIndex).toBe(1000);
    });
    it('size.', () => {
      component.loading.set(true);
      component.size.set('small');
      fixture.detectChanges();
      const loading = fixture.debugElement.query(By.css('.x-loading'));
      expect(loading.nativeElement).toHaveClass('x-loading-small');
    });
    it('text.', () => {
      component.loading.set(true);
      component.text.set('loading');
      fixture.detectChanges();
      const text = fixture.debugElement.query(By.css('.x-loading-text'));
      expect(text.nativeElement.innerText).toBe('loading');
    });
    it('icon.', () => {
      component.loading.set(true);
      component.icon.set('fto-loader');
      fixture.detectChanges();
      const icon = fixture.debugElement.query(By.css('.x-loading-icon'));
      expect(icon).toBeTruthy();
    });
    it('color.', () => {
      component.loading.set(true);
      component.color.set('rgb(0, 255, 0)');
      fixture.detectChanges();
      const spinner = fixture.debugElement.query(By.css('.x-loading-spinner'));
      const color = XComputedStyle(spinner.nativeElement, 'color');
      expect(color).toBe('rgb(0, 255, 0)');
    });
    it('fullScreen.', () => {
      component.loading.set(true);
      component.fullScreen.set(true);
      fixture.detectChanges();
      const loading = fixture.debugElement.query(By.css('.x-loading')).nativeElement;
      const { clientWidth, clientHeight } = document.documentElement;
      expect(loading.clientWidth).toBe(clientWidth);
      expect(loading.clientHeight).toBe(clientHeight);
      component.loading.set(false);
    });
    it('radius.', () => {
      component.radius.set(true);
      component.loading.set(true);
      fixture.detectChanges();
      const loading = fixture.debugElement.query(By.css('.x-loading'));
      expect(loading.nativeElement).toHaveClass('x-loading-radius');
    });
    it('background.', () => {
      component.background.set('rgb(0, 255, 0)');
      component.loading.set(true);
      fixture.detectChanges();
      const loading = fixture.debugElement.query(By.css('.x-loading'));
      const background = XComputedStyle(loading.nativeElement, 'background-color');
      expect(background).toBe('rgb(0, 255, 0)');
    });
  });
});
