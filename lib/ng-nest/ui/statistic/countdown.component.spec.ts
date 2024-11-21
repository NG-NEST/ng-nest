import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XCountdownComponent, XCountdownPrefix } from '@ng-nest/ui/statistic';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { XAddDays, XAddSeconds, XSleep, XStyle, XTemplate } from '@ng-nest/ui/core';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  imports: [XCountdownComponent],
  template: ` <x-countdown> </x-countdown> `
})
class XTestCountdownComponent {}

@Component({
  imports: [XCountdownComponent],
  template: `
    <x-countdown
      [value]="value()"
      [label]="label()"
      [prefix]="prefix()"
      [suffix]="suffix()"
      [valueStyle]="valueStyle()"
      [format]="format()"
      (finish)="finish()"
    >
    </x-countdown>
  `
})
class XTestCountdownPropertyComponent {
  value = signal<XTemplate | null>(null);
  label = signal<XTemplate | null>(null);
  prefix = signal<XTemplate | null>(null);
  suffix = signal<XTemplate | null>(null);
  valueStyle = signal<XStyle>({});
  format = signal('HH:mm:ss');

  finishResult = signal(false);
  finish() {
    this.finishResult.set(true);
  }
}

describe(XCountdownPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestCountdownComponent, XTestCountdownPropertyComponent],
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideExperimentalZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestCountdownComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestCountdownComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XCountdownComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestCountdownPropertyComponent>;
    let component: XTestCountdownPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestCountdownPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('value.', async () => {
      const time = XAddDays(new Date(), 2).getTime();
      component.value.set(time);
      fixture.detectChanges();
      await XSleep(100);
      const value = fixture.debugElement.query(By.css('.x-statistic-value-int'));
      expect(value.nativeElement.innerText).toBe('47:59:59');
    });
    it('label.', () => {
      component.label.set('Label');
      fixture.detectChanges();
      const label = fixture.debugElement.query(By.css('.x-statistic-label'));
      expect(label.nativeElement.innerText).toBe('Label');
    });
    it('prefix.', () => {
      component.prefix.set('Time');
      fixture.detectChanges();
      const prefix = fixture.debugElement.query(By.css('.x-statistic-value-prefix'));
      expect(prefix.nativeElement.innerText).toBe('Time');
    });
    it('suffix.', () => {
      component.suffix.set('*');
      fixture.detectChanges();
      const suffix = fixture.debugElement.query(By.css('.x-statistic-value-suffix'));
      expect(suffix.nativeElement.innerText).toBe('*');
    });
    it('valueStyle.', async () => {
      component.valueStyle.set({ color: 'rgb(0, 255, 0)' });
      fixture.detectChanges();
      await XSleep(100);
      const value = fixture.debugElement.query(By.css('.x-statistic-value'));
      expect(value.nativeElement.style.color).toBe('rgb(0, 255, 0)');
    });
    it('format.', async () => {
      component.format.set('D �� H ʱ m �� s ��');
      component.value.set(XAddDays(new Date(), 2).getTime());
      fixture.detectChanges();
      await XSleep(100);
      const value = fixture.debugElement.query(By.css('.x-statistic-value-int'));
      expect(value.nativeElement.innerText).toBe('1 �� 23 ʱ 59 �� 59 ��');
    });
    it('finish.', async () => {
      component.value.set(XAddSeconds(new Date(), 1).getTime());
      fixture.detectChanges();
      await XSleep(100);
      expect(component.finishResult()).toBeFalse();
      await XSleep(1000);
      expect(component.finishResult()).toBeTrue();
    });
  });
});
