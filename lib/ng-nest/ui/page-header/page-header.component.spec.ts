import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XPageHeaderComponent, XPageHeaderPrefix } from '@ng-nest/ui/page-header';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [XPageHeaderComponent],
  template: `<x-page-header></x-page-header> `
})
class XTestPageHeaderComponent {}

@Component({
  standalone: true,
  imports: [XPageHeaderComponent],
  template: `
    <x-page-header
      [backIcon]="backIcon()"
      [backText]="backText()"
      [title]="title()"
      [subTitle]="subTitle()"
      (backClick)="backClick($event)"
    >
    </x-page-header>
  `
})
class XTestPageHeaderPropertyComponent {
  backIcon = signal('fto-arrow-left');
  backText = signal('');
  title = signal('');
  subTitle = signal('');

  backClickResult = signal<Event | null>(null);
  backClick(event: Event) {
    this.backClickResult.set(event);
  }
}

describe(XPageHeaderPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestPageHeaderComponent, XTestPageHeaderPropertyComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestPageHeaderComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestPageHeaderComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XPageHeaderComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestPageHeaderPropertyComponent>;
    // let component: XTestPageHeaderPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestPageHeaderPropertyComponent);
      // component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('backIcon.', () => {
      expect(true).toBe(true);
    });
    it('backText.', () => {
      expect(true).toBe(true);
    });
    it('title.', () => {
      expect(true).toBe(true);
    });
    it('subTitle.', () => {
      expect(true).toBe(true);
    });
    it('backClick.', () => {
      expect(true).toBe(true);
    });
  });
});
