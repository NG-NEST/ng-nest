import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, provideZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XLinkComponent, XLinkPrefix, XLinkType } from '@ng-nest/ui/link';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@Component({
  imports: [XLinkComponent],
  template: `<x-link>Link</x-link>`
})
class XTestLinkComponent {}

@Component({
  imports: [XLinkComponent],
  template: `<x-link
    [href]="href()"
    [icon]="icon()"
    [underline]="underline()"
    [disabled]="disabled()"
    [iconRight]="iconRight()"
    [type]="type()"
    [target]="target()"
    >Link</x-link
  >`
})
class XTestLinkPropertyComponent {
  href = signal('');
  icon = signal('');
  underline = signal(false);
  disabled = signal(false);
  iconRight = signal(false);
  type = signal<XLinkType>('initial');
  target = signal('');
}

xdescribe(XLinkPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestLinkComponent, XTestLinkPropertyComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  xdescribe('default.', () => {
    let fixture: ComponentFixture<XTestLinkComponent>;
    let link: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestLinkComponent);
      link = fixture.debugElement.query(By.css('.x-link'));
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XLinkComponent));
      expect(com).toBeDefined();
    });
    it('property.', () => {
      expect(link.nativeElement).toHaveClass('x-link-initial');
      expect(link.nativeElement).not.toHaveClass('x-link-disabled');
      expect(link.nativeElement).not.toHaveClass('x-link-underline');
      expect(link.nativeElement).not.toHaveClass('x-link-icon-right');
      expect(link.nativeElement).not.toHaveClass('x-link-only-icon');
      expect(link.nativeElement.hasAttribute('href')).toBe(false);
      expect(link.nativeElement.hasAttribute('target')).toBe(false);
      expect(link.nativeElement.textContent).toBe('Link');
    });
  });
  xdescribe(`input.`, async () => {
    let fixture: ComponentFixture<XTestLinkPropertyComponent>;
    let component: XTestLinkPropertyComponent;
    let link: DebugElement;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestLinkPropertyComponent);
      link = fixture.debugElement.query(By.css('.x-link'));
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('href.', () => {
      component.href.set('https://www.ngnest.com');
      fixture.detectChanges();
      expect(link.nativeElement.getAttribute('href')).toBe('https://www.ngnest.com');
    });
    it('underline.', () => {
      component.underline.set(true);
      fixture.detectChanges();
      expect(link.nativeElement).toHaveClass('x-link-underline');
    });
    it('disabled.', () => {
      component.disabled.set(true);
      fixture.detectChanges();
      expect(link.nativeElement).toHaveClass('x-link-disabled');
    });
    it('iconRight.', () => {
      component.iconRight.set(true);
      fixture.detectChanges();
      expect(link.nativeElement).toHaveClass('x-link-icon-right');
    });
    it('type.', () => {
      component.type.set('danger');
      fixture.detectChanges();
      expect(link.nativeElement).toHaveClass('x-link-danger');
    });
    it('target.', () => {
      component.target.set('_blank');
      fixture.detectChanges();
      expect(link.nativeElement.getAttribute('target')).toBe('_blank');
    });
  });
});
