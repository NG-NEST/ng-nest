import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XPageHeaderComponent, XPageHeaderPrefix } from '@ng-nest/ui/page-header';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

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
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideExperimentalZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
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
    let component: XTestPageHeaderPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestPageHeaderPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('backIcon.', () => {
      component.backIcon.set('fto-chevron-left');
      fixture.detectChanges();
      const icon = fixture.debugElement.query(By.css('x-icon'));
      expect(icon.nativeElement).toHaveClass('fto-chevron-left');
    });
    it('backText.', () => {
      component.backText.set('back');
      fixture.detectChanges();
      const pageHeader = fixture.debugElement.query(By.css('.x-page-header'));
      expect(pageHeader.nativeElement.innerText).toBe('back');
    });
    it('title.', () => {
      component.title.set('title');
      fixture.detectChanges();
      const pageHeaderTitle = fixture.debugElement.query(By.css('.x-page-header-title'));
      expect(pageHeaderTitle.nativeElement.innerText).toBe('title');
    });
    it('subTitle.', () => {
      component.subTitle.set('sub title');
      fixture.detectChanges();
      const pageHeaderSubTitle = fixture.debugElement.query(By.css('.x-page-header-subTitle'));
      expect(pageHeaderSubTitle.nativeElement.innerText).toBe('sub title');
    });
    it('backClick.', () => {
      const iconBtn = fixture.debugElement.query(By.css('.x-page-header-backIcon'));
      iconBtn.nativeElement.click();
      fixture.detectChanges();
      expect(component.backClickResult()).not.toBeNull();
    });
  });
});
