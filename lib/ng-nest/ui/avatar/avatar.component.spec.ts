import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XAvatarComponent, XAvatarFit, XAvatarPrefix, XAvatarShape, XAvatarSize } from '@ng-nest/ui/avatar';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [XAvatarComponent],
  template: `<x-avatar></x-avatar>`
})
class XTestAvatarComponent {}

@Component({
  standalone: true,
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
  size = signal<XAvatarSize>('medium');
  icon = signal('');
  shape = signal<XAvatarShape>('circle');
  src = signal('');
  fit = signal<XAvatarFit>('cover');
  gap = signal('4px');
  backgroundColor = signal('#999999');
}

describe(XAvatarPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestAvatarComponent, XTestAvatarPropertyComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe('default.', () => {
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
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestAvatarPropertyComponent>;
    let component: XTestAvatarPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestAvatarPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('label.', () => {});
  });
});
