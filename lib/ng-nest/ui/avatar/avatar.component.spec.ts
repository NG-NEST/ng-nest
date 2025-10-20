import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, provideZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  XAvatarComponent,
  XAvatarFit,
  XAvatarGroupComponent,
  XAvatarPrefix,
  XAvatarShape,
  XAvatarSize
} from '@ng-nest/ui/avatar';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { XResponseSize, XSleep } from '@ng-nest/ui/core';

@Component({
  selector: 'x-test-avatar',
  imports: [XAvatarComponent, XAvatarGroupComponent],
  template: ` <x-avatar-group>
    <x-avatar></x-avatar>
  </x-avatar-group>`
})
class XTestAvatarComponent {}

@Component({
  selector: 'x-test-avatar-property',
  imports: [XAvatarComponent],
  template: `
    <x-avatar
      [label]="label()"
      [size]="size()"
      [icon]="icon()"
      [shape]="shape()"
      [src]="src()"
      [fit]="fit()"
      [gap]="gap()"
      [backgroundColor]="backgroundColor()"
    ></x-avatar>
  `
})
class XTestAvatarPropertyComponent {
  label = signal('');
  size = signal<number | XAvatarSize | XResponseSize>('medium');
  icon = signal('');
  shape = signal<XAvatarShape>('circle');
  src = signal('');
  fit = signal<XAvatarFit>('cover');
  gap = signal('4px');
  backgroundColor = signal('rgb(153, 153, 153)');
}

xdescribe(XAvatarPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestAvatarComponent, XTestAvatarPropertyComponent],
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  xdescribe('default.', () => {
    let fixture: ComponentFixture<XTestAvatarComponent>;
    let avatar: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestAvatarComponent);
      avatar = fixture.debugElement.query(By.css('.x-avatar'));
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XAvatarComponent));
      expect(com).toBeDefined();
    });
    it('property.', () => {
      expect(avatar.nativeElement).not.toHaveClass('x-avatar-label');
      expect(avatar.nativeElement).not.toHaveClass('x-avatar-error');
      expect(avatar.nativeElement).toHaveClass('x-avatar-medium');
    });
  });
  xdescribe(`input.`, async () => {
    let fixture: ComponentFixture<XTestAvatarPropertyComponent>;
    let component: XTestAvatarPropertyComponent;
    let avatar: DebugElement;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestAvatarPropertyComponent);
      component = fixture.componentInstance;
      avatar = fixture.debugElement.query(By.css('.x-avatar'));
      fixture.detectChanges();
    });
    it('label.', () => {
      component.label.set('Label');
      fixture.detectChanges();
      expect(avatar.nativeElement.textContent.trim()).toBe('Label');
    });
    it('size.', () => {
      expect(avatar.nativeElement).toHaveClass('x-avatar-medium');
      component.size.set('mini');
      fixture.detectChanges();
      expect(avatar.nativeElement).toHaveClass('x-avatar-mini');
    });
    it('size number.', () => {
      expect(avatar.nativeElement).toHaveClass('x-avatar-medium');
      component.size.set(100);
      fixture.detectChanges();
      expect(avatar.nativeElement.clientWidth).toBe(100);
      expect(avatar.nativeElement.clientHeight).toBe(100);
    });
    it('size response.', () => {
      expect(avatar.nativeElement).toHaveClass('x-avatar-medium');
      component.size.set({ xs: 100, sm: 200, md: 300, lg: 400, xl: 500 });
      fixture.detectChanges();
      const wwidth = document.documentElement.clientWidth;
      let awidth = 40;
      if (wwidth < 768) {
        awidth = 100;
      }
      if (wwidth >= 768) {
        awidth = 200;
      }
      if (wwidth >= 992) {
        awidth = 300;
      }
      if (wwidth >= 1200) {
        awidth = 400;
      }
      if (wwidth >= 1920) {
        awidth = 500;
      }
      expect(avatar.nativeElement.clientWidth).toBe(awidth);
    });
    it('icon.', () => {
      component.icon.set('fto-x');
      fixture.detectChanges();
      const icon = fixture.debugElement.query(By.css('x-icon'));
      expect(icon.nativeElement).toHaveClass('fto-x');
    });
    it('shape.', () => {
      expect(avatar.nativeElement).toHaveClass('x-avatar-circle');
      component.shape.set('square');
      fixture.detectChanges();
      expect(avatar.nativeElement).toHaveClass('x-avatar-square');
    });
    it('src.', () => {
      const src = 'https://ngnest.com/img/logo/logo-144x144.png';
      component.src.set(src);
      fixture.detectChanges();
      const img = fixture.debugElement.query(By.css('img'));
      expect(img.nativeElement.getAttribute('src')).toBe(src);
    });
    it('src error.', async () => {
      const src = 'error';
      component.src.set(src);
      fixture.detectChanges();
      await XSleep(1000);
      expect(avatar.nativeElement).toHaveClass('x-avatar-error');
    });
    it('fit.', () => {
      component.src.set('https://ngnest.com/img/logo/logo-144x144.png');
      fixture.detectChanges();
      const img = fixture.debugElement.query(By.css('img'));
      expect(img.nativeElement.style.objectFit).toBe('cover');

      component.fit.set('fill');
      fixture.detectChanges();
      expect(img.nativeElement.style.objectFit).toBe('fill');
    });
    it('gap.', () => {
      component.label.set('NEST');
      fixture.detectChanges();
      const label = fixture.debugElement.query(By.css('.x-avatar-text'));
      expect(label.nativeElement.style.transform).toBe('scale(0.5)');

      component.gap.set('1rem');
      fixture.detectChanges();
      expect(label.nativeElement.style.transform).toBe('scale(0.125)');
    });
    it('background color.', () => {
      expect(avatar.nativeElement.style.backgroundColor).toBe('rgb(153, 153, 153)');

      component.backgroundColor.set('rgb(0, 0, 0)');
      fixture.detectChanges();
      expect(avatar.nativeElement.style.backgroundColor).toBe('rgb(0, 0, 0)');
    });
  });
});
