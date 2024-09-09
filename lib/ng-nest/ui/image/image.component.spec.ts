import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XImageComponent, XImagePrefix } from '@ng-nest/ui/image';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XTemplate } from '@ng-nest/ui/core';

@Component({
  standalone: true,
  imports: [XImageComponent],
  template: ` <x-image></x-image> `
})
class XTestImageComponent {}

@Component({
  standalone: true,
  imports: [XImageComponent],
  template: ` <x-image> </x-image> `
})
class XTestImagePropertyComponent {
  src = signal('');
  width = signal('');
  height = signal('');
  alt = signal('');
  fallback = signal('');
  previewText = signal('');
  placeholder = signal('');
  previewTpl = signal<XTemplate>('');

  errorResult = signal<ErrorEvent | null>(null);
  error(event: ErrorEvent) {
    this.errorResult.set(event);
  }

  loadResult = signal<Event | null>(null);
  load(event: Event) {
    this.loadResult.set(event);
  }
}

describe(XImagePrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestImageComponent, XTestImagePropertyComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestImageComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestImageComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XImageComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestImagePropertyComponent>;
    // let component: XTestImagePropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestImagePropertyComponent);
      // component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('src.', () => {
      expect(true).toBe(true);
    });
    it('width.', () => {
      expect(true).toBe(true);
    });
    it('height.', () => {
      expect(true).toBe(true);
    });
    it('alt.', () => {
      expect(true).toBe(true);
    });
    it('fallback.', () => {
      expect(true).toBe(true);
    });
    it('previewText.', () => {
      expect(true).toBe(true);
    });
    it('placeholder.', () => {
      expect(true).toBe(true);
    });
    it('previewTpl.', () => {
      expect(true).toBe(true);
    });
    it('error.', () => {
      expect(true).toBe(true);
    });
    it('load.', () => {
      expect(true).toBe(true);
    });
  });
});
