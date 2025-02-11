import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XIconComponent, XIconPrefix } from '@ng-nest/ui/icon';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { XComputedStyle, XSleep } from '@ng-nest/ui/core';

@Component({
  imports: [XIconComponent],
  template: ` <x-icon></x-icon> `
})
class XTestIconComponent {}

@Component({
  imports: [XIconComponent],
  template: ` <x-icon [href]="href()" [type]="type()" [color]="color()" [spin]="spin()"> </x-icon> `
})
class XTestIconPropertyComponent {
  href = signal('https://ngnest.com/static/icons/');
  type = signal('');
  color = signal('');
  spin = signal(false);
}

xdescribe(XIconPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestIconComponent, XTestIconPropertyComponent],
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideExperimentalZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  xdescribe('default.', () => {
    let fixture: ComponentFixture<XTestIconComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestIconComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XIconComponent));
      expect(com).toBeDefined();
    });
  });
  xdescribe(`input.`, async () => {
    let fixture: ComponentFixture<XTestIconPropertyComponent>;
    let component: XTestIconPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestIconPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('href.', async () => {
      // href can be specified as empty, copy icon resources to the local asset directory
      // icon resources: https://github.com/NG-NEST/ng-nest-icon
      component.type.set('fto-user');
      fixture.detectChanges();
      await XSleep(300);
      const icon = fixture.debugElement.query(By.css('x-icon'));
      expect(icon.nativeElement).toHaveClass('fto-user');
      expect(icon.nativeElement.firstChild.localName).toBe('svg');
    });
    it('type.', async () => {
      component.type.set('fto-user');
      fixture.detectChanges();
      await XSleep(300);
      const icon = fixture.debugElement.query(By.css('x-icon'));
      expect(icon.nativeElement).toHaveClass('fto-user');
      expect(icon.nativeElement.firstChild.localName).toBe('svg');
    });
    it('color.', async () => {
      component.color.set('rgb(255, 255, 0)');
      component.type.set('fto-user');
      fixture.detectChanges();
      const icon = fixture.debugElement.query(By.css('x-icon'));
      const color = XComputedStyle(icon.nativeElement, 'color');
      expect(color).toBe('rgb(255, 255, 0)');
    });
    it('spin.', () => {
      component.type.set('fto-settings');
      component.spin.set(true);
      fixture.detectChanges();
      const icon = fixture.debugElement.query(By.css('x-icon'));
      expect(icon.nativeElement).toHaveClass('x-icon-spin');
    });
  });
});
