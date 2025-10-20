import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, provideZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XBadgeComponent, XBadgePrefix, XBadgeType } from '@ng-nest/ui/badge';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  imports: [XBadgeComponent],
  template: `
    <x-badge value="10">
      <button>Button</button>
    </x-badge>
  `
})
class XTestBadgeComponent {}

@Component({
  imports: [XBadgeComponent],
  template: `
    <x-badge
      [type]="type()"
      [max]="max()"
      [value]="value()"
      [offsetLeft]="offsetLeft()"
      [offsetTop]="offsetTop()"
      [dot]="dot()"
      [standalone]="standalone()"
    >
      <button>Button</button>
    </x-badge>
  `
})
class XTestBadgePropertyComponent {
  type = signal<XBadgeType>('danger');
  value = signal(10);
  max = signal(99);
  offsetLeft = signal('');
  offsetTop = signal('');
  dot = signal(false);
  standalone = signal(false);
}

xdescribe(XBadgePrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestBadgeComponent, XTestBadgePropertyComponent],
      providers: [
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  xdescribe('default.', () => {
    let fixture: ComponentFixture<XTestBadgeComponent>;
    let badge: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestBadgeComponent);
      badge = fixture.debugElement.query(By.css('.x-badge'));
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XBadgeComponent));
      expect(com).toBeDefined();
    });
    it('property.', () => {
      expect(badge.nativeElement).toHaveClass('x-badge-danger');
      let scrolls = fixture.debugElement.queryAll(By.css('.x-badge-scroll'));
      expect(scrolls[0].nativeElement.style.transform).toBe('translateY(-100%)');
      expect(scrolls[1].nativeElement.style.transform).toBe('translateY(0%)');
    });
  });
  xdescribe(`input.`, async () => {
    let fixture: ComponentFixture<XTestBadgePropertyComponent>;
    let component: XTestBadgePropertyComponent;
    let badge: DebugElement;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestBadgePropertyComponent);
      component = fixture.componentInstance;
      badge = fixture.debugElement.query(By.css('.x-badge'));
      fixture.detectChanges();
    });
    it('type.', () => {
      expect(badge.nativeElement).toHaveClass('x-badge-danger');

      component.type.set('primary');
      fixture.detectChanges();
      expect(badge.nativeElement).toHaveClass('x-badge-primary');
    });
    it('max.', () => {
      component.value.set(200);
      fixture.detectChanges();
      let scrolls = fixture.debugElement.queryAll(By.css('.x-badge-scroll'));
      expect(scrolls[0].nativeElement.style.transform).toBe('translateY(-900%)');
      expect(scrolls[1].nativeElement.style.transform).toBe('translateY(-900%)');
      expect(scrolls[2].nativeElement.style.transform).toBe('translateY(-1000%)');

      component.max.set(300);
      fixture.detectChanges();
      scrolls = fixture.debugElement.queryAll(By.css('.x-badge-scroll'));
      expect(scrolls[0].nativeElement.style.transform).toBe('translateY(-200%)');
      expect(scrolls[1].nativeElement.style.transform).toBe('translateY(0%)');
      expect(scrolls[2].nativeElement.style.transform).toBe('translateY(0%)');
    });
    it('value.', () => {
      component.value.set(50);
      fixture.detectChanges();
      let scrolls = fixture.debugElement.queryAll(By.css('.x-badge-scroll'));
      expect(scrolls[0].nativeElement.style.transform).toBe('translateY(-500%)');
      expect(scrolls[1].nativeElement.style.transform).toBe('translateY(0%)');
    });
    it('offsetLeft.', () => {
      component.offsetLeft.set('10px');
      fixture.detectChanges();
      let sup = fixture.debugElement.query(By.css('sup'));
      expect(sup.nativeElement.style.marginRight).toBe('10px');
    });
    it('offsetTop.', () => {
      component.offsetTop.set('10px');
      fixture.detectChanges();
      let sup = fixture.debugElement.query(By.css('sup'));
      expect(sup.nativeElement.style.marginTop).toBe('10px');
    });
    it('dot.', () => {
      component.dot.set(true);
      fixture.detectChanges();
      expect(badge.nativeElement).toHaveClass('x-badge-dot');
    });
    it('standalone.', () => {
      component.standalone.set(true);
      fixture.detectChanges();
      expect(badge.nativeElement).toHaveClass('x-badge-standalone');
    });
  });
});
