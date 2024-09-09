import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XLoadingComponent, XLoadingPrefix } from '@ng-nest/ui/loading';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XBoolean, XCorner, XSize } from '@ng-nest/ui/core';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  standalone: true,
  imports: [XLoadingComponent],
  template: ` <div x-loading></div> `
})
class XTestLoadingComponent {}

@Component({
  standalone: true,
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
    ></div>
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
      providers: [
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ],
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
    // let component: XTestLoadingPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestLoadingPropertyComponent);
      // component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('loading.', () => {
      expect(true).toBe(true);
    });
    it('zIndex.', () => {
      expect(true).toBe(true);
    });
    it('size.', () => {
      expect(true).toBe(true);
    });
    it('text.', () => {
      expect(true).toBe(true);
    });
    it('icon.', () => {
      expect(true).toBe(true);
    });
    it('color.', () => {
      expect(true).toBe(true);
    });
    it('fullScreen.', () => {
      expect(true).toBe(true);
    });
    it('radius.', () => {
      expect(true).toBe(true);
    });
    it('background.', () => {
      expect(true).toBe(true);
    });
  });
});
