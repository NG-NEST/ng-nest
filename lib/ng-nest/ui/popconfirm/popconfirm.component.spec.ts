import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XPopconfirmComponent, XPopconfirmPrefix } from '@ng-nest/ui/popconfirm';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { XComputedStyle, XPlacement, XSleep, XTemplate } from '@ng-nest/ui/core';
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
      >text</x-popconfirm
    >
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
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideExperimentalZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
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
    let component: XTestPopconfirmPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestPopconfirmPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    const showPortal = async (type: 'click' | 'hover' = 'click') => {
      const com = fixture.debugElement.query(By.css('.x-popconfirm'));
      if (type === 'click') {
        com.nativeElement.click();
      } else if (type === 'hover') {
        com.nativeElement.dispatchEvent(new Event('mouseenter'));
      }
      fixture.detectChanges();
      await XSleep(300);
    };
    const closePortal = async () => {
      const cancel = fixture.debugElement.query(By.css('.x-popconfirm-cancel')).nativeElement;
      cancel.click();
      fixture.detectChanges();
      await XSleep(300);
    };
    it('title.', async () => {
      component.title.set('title');
      fixture.detectChanges();
      await showPortal();
      const title = fixture.debugElement.query(By.css('.x-popover-portal-title'));
      expect(title.nativeElement.innerText).toBe('title');
      await closePortal();
    });
    it('content.', async () => {
      component.content.set('content');
      fixture.detectChanges();
      await showPortal();
      const content = fixture.debugElement.query(By.css('.x-popover-portal-content'));
      expect(content.nativeElement.innerText).toBe('content');
      await closePortal();
    });
    it('placement.', async () => {
      // cdk overlay. Restricted by browser window size
    });
    it('trigger.', async () => {
      component.trigger.set('hover');
      fixture.detectChanges();
      await showPortal('hover');
      const popover = fixture.debugElement.query(By.css('.x-popover-portal'));
      expect(popover).toBeTruthy();
      await closePortal();
    });
    it('width.', async () => {
      component.width.set('250px');
      component.minWidth.set('250px');
      fixture.detectChanges();
      await showPortal();
      const inner = fixture.debugElement.query(By.css('.x-popover-portal-inner')).nativeElement;
      expect(inner.clientWidth).toBe(250);
      await closePortal();
    });
    it('maxWidth.', async () => {
      component.maxWidth.set('300px');
      fixture.detectChanges();
      await showPortal();
      const inner = fixture.debugElement.query(By.css('.x-popover-portal-inner')).nativeElement;
      const maxWidth = Number(XComputedStyle(inner, 'max-width'));
      expect(maxWidth).toBe(300);
      await closePortal();
    });
    it('minWidth.', async () => {
      component.minWidth.set('300px');
      fixture.detectChanges();
      await showPortal();
      const inner = fixture.debugElement.query(By.css('.x-popover-portal-inner')).nativeElement;
      const minWidth = Number(XComputedStyle(inner, 'min-width'));
      expect(minWidth).toBe(300);
      await closePortal();
    });
    it('icon.', async () => {
      component.icon.set('fto-user');
      fixture.detectChanges();
      await showPortal();
      const icon = fixture.debugElement.query(By.css('x-icon')).nativeElement;
      expect(icon).toHaveClass('fto-user');
      await closePortal();
    });
    it('iconColor.', async () => {
      component.iconColor.set('rgb(0, 255, 0)');
      fixture.detectChanges();
      await showPortal();
      const icon = fixture.debugElement.query(By.css('x-icon')).nativeElement;
      const color = XComputedStyle(icon, 'color');
      expect(color).toBe('rgb(0, 255, 0)');
      await closePortal();
    });
    it('cancelText.', async () => {
      component.cancelText.set('cancel');
      fixture.detectChanges();
      await showPortal();
      const cancel = fixture.debugElement.query(By.css('.x-popconfirm-cancel')).nativeElement;
      expect(cancel.innerText).toBe('cancel');
      await closePortal();
    });
    it('confirmText.', async () => {
      component.confirmText.set('confirm');
      fixture.detectChanges();
      await showPortal();
      const confirm = fixture.debugElement.query(By.css('.x-popconfirm-confirm')).nativeElement;
      expect(confirm.innerText).toBe('confirm');
      await closePortal();
    });
    it('confirmAsync.', async () => {
      let confirmParam = false;
      component.confirmAsync.set(
        new Observable<void>((x) => {
          confirmParam = true;
          setTimeout(() => {
            x.next();
          }, 1000);
        })
      );
      fixture.detectChanges();
      await showPortal();
      const confirm = fixture.debugElement.query(By.css('.x-popconfirm-confirm')).nativeElement;
      confirm.click();
      fixture.detectChanges();
      expect(confirmParam).toBe(true);
      await XSleep(1300);
    });
    it('condition.', async () => {
      component.condition.set(true);
      fixture.detectChanges();
      await showPortal();
      let popover = fixture.debugElement.query(By.css('.x-popover-portal'));
      expect(popover).toBeFalsy();
      component.condition.set(false);
      fixture.detectChanges();
      await showPortal();
      popover = fixture.debugElement.query(By.css('.x-popover-portal'));
      expect(popover).toBeTruthy();
      await closePortal();
    });
    it('cancel.', async () => {
      await showPortal();
      await closePortal();
      expect(component.cancelResult()).not.toBeNull();
    });
    it('confirm.', async () => {
      await showPortal();
      const confirm = fixture.debugElement.query(By.css('.x-popconfirm-confirm')).nativeElement;
      confirm.click();
      fixture.detectChanges();
      expect(component.confirmResult()).not.toBeNull();
    });
  });
});
