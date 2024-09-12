import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XPopconfirmComponent, XPopconfirmPrefix } from '@ng-nest/ui/popconfirm';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { XPlacement, XTemplate } from '@ng-nest/ui/core';
import { XPopoverTrigger } from '@ng-nest/ui/popover';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  imports: [XPopconfirmComponent],
  template: ` <x-popconfirm></x-popconfirm> `
})
class XTestPopconfirmComponent {}

@Component({
  standalone: true,
  imports: [XPopconfirmComponent],
  template: `
    <x-popconfirm
      [title]="title()"
      [content]="content()"
      [placement]="placement()"
      [trigger]="trigger()"
      [width]="width()"
      [maxWidth]="maxWidth()"
      [minWidth]="minWidth()"
      [icon]="icon()"
      [iconColor]="iconColor()"
      [cancelText]="cancelText()"
      [confirmText]="confirmText()"
      [confirmAsync]="confirmAsync()"
      [condition]="condition()"
      (cancel)="cancel($event)"
      (confirm)="confirm($event)"
    ></x-popconfirm>
  `
})
class XTestPopconfirmPropertyComponent {
  title = signal<XTemplate>('');
  content = signal<XTemplate>('');
  placement = signal<XPlacement>('bottom');
  trigger = signal<XPopoverTrigger>('click');
  width = signal('');
  maxWidth = signal('15rem');
  minWidth = signal('15rem');
  icon = signal('fto-help-circle');
  iconColor = signal('#e6a23c');
  cancelText = signal('');
  confirmText = signal('');
  confirmAsync = signal<Observable<void> | null>(null);
  condition = signal(false);

  cancelResult = signal<Event | null>(null);
  cancel(event: Event) {
    this.cancelResult.set(event);
  }

  confirmResult = signal<Event | null>(null);
  confirm(event: Event) {
    this.confirmResult.set(event);
  }
}

describe(XPopconfirmPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestPopconfirmComponent, XTestPopconfirmPropertyComponent],
      providers: [
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestPopconfirmComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestPopconfirmComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XPopconfirmComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestPopconfirmPropertyComponent>;
    // let component: XTestPopconfirmPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestPopconfirmPropertyComponent);
      // component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('title.', () => {
      expect(true).toBe(true);
    });
    it('content.', () => {
      expect(true).toBe(true);
    });
    it('placement.', () => {
      expect(true).toBe(true);
    });
    it('trigger.', () => {
      expect(true).toBe(true);
    });
    it('width.', () => {
      expect(true).toBe(true);
    });
    it('maxWidth.', () => {
      expect(true).toBe(true);
    });
    it('minWidth.', () => {
      expect(true).toBe(true);
    });
    it('icon.', () => {
      expect(true).toBe(true);
    });
    it('iconColor.', () => {
      expect(true).toBe(true);
    });
    it('cancelText.', () => {
      expect(true).toBe(true);
    });
    it('confirmText.', () => {
      expect(true).toBe(true);
    });
    it('confirmAsync.', () => {
      expect(true).toBe(true);
    });
    it('condition.', () => {
      expect(true).toBe(true);
    });
    it('cancel.', () => {
      expect(true).toBe(true);
    });
    it('confirm.', () => {
      expect(true).toBe(true);
    });
  });
});
