import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XDrawerComponent, XDrawerPrefix } from '@ng-nest/ui/drawer';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XPosition, XTemplate } from '@ng-nest/ui/core';

@Component({
  standalone: true,
  imports: [XDrawerComponent],
  template: ` <x-drawer></x-drawer> `
})
class XTestDrawerComponent {}

@Component({
  standalone: true,
  imports: [XDrawerComponent],
  template: `
    <x-drawer
      [title]="title()"
      [visible]="visible()"
      [placement]="placement()"
      [backdropClose]="backdropClose()"
      [hasBackdrop]="hasBackdrop()"
      [className]="className()"
      (close)="close()"
    >
    </x-drawer>
  `
})
class XTestDrawerPropertyComponent {
  title = signal<XTemplate>('');
  visible = signal(false);
  placement = signal<XPosition>('right');
  size = signal('30%');
  backdropClose = signal(true);
  hasBackdrop = signal(true);
  className = signal('');
  close() {}
}

describe(XDrawerPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestDrawerComponent, XTestDrawerPropertyComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestDrawerComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestDrawerComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XDrawerComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestDrawerPropertyComponent>;
    // let component: XTestDrawerPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestDrawerPropertyComponent);
      // component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('title.', () => {
      expect(true).toBe(true);
    });
    it('visible.', () => {
      expect(true).toBe(true);
    });
    it('placement.', () => {
      expect(true).toBe(true);
    });
    it('size.', () => {
      expect(true).toBe(true);
    });
    it('backdropClose.', () => {
      expect(true).toBe(true);
    });
    it('hasBackdrop.', () => {
      expect(true).toBe(true);
    });
    it('className.', () => {
      expect(true).toBe(true);
    });
    it('close.', () => {
      expect(true).toBe(true);
    });
  });
});
