import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ElementRef, provideExperimentalZonelessChangeDetection, signal, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XTooltipDirective, XTooltipPrefix } from '@ng-nest/ui/tooltip';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { XComputedStyle, XPlacement, XSleep, XTemplate } from '@ng-nest/ui/core';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  imports: [XTooltipDirective],
  template: ` <x-tooltip> </x-tooltip> `
})
class XTestTooltipComponent {}

@Component({
  imports: [XTooltipDirective],
  template: `
    <div
      style="position: absolute; left: 0; top: 0; width: 30px"
      x-tooltip
      [content]="content()"
      [placement]="placement()"
      [(visible)]="visible"
      [panelClass]="panelClass()"
      [connectTo]="connectTo()"
      [backgroundColor]="backgroundColor()"
      [color]="color()"
      [manual]="manual()"
      [mouseEnterDelay]="mouseEnterDelay()"
      [mouseLeaveDelay]="mouseLeaveDelay()"
      [disabled]="disabled()"
    >
      text
    </div>

    <div #connectToRef style="position: absolute; left: 0; top: 0; width: 50px">connect to</div>
  `
})
class XTestTooltipPropertyComponent {
  content = signal<XTemplate | null>(null);
  placement = signal<XPlacement>('top');
  visible = signal(false);
  panelClass = signal<string | string[]>('');
  connectTo = signal<ElementRef<HTMLElement> | HTMLElement | null>(null);
  connectToRef = viewChild.required<ElementRef<HTMLElement>>('connectToRef');
  backgroundColor = signal('');
  color = signal('');
  manual = signal(false);
  mouseEnterDelay = signal(150);
  mouseLeaveDelay = signal(100);
  disabled = signal(false);
}

describe(XTooltipPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestTooltipComponent, XTestTooltipPropertyComponent],
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideExperimentalZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestTooltipComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestTooltipComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XTooltipDirective));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestTooltipPropertyComponent>;
    let component: XTestTooltipPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestTooltipPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    const showPortal = async () => {
      const com = fixture.debugElement.query(By.directive(XTooltipDirective));
      com.nativeElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      await XSleep(300);
    };
    const closePortal = async () => {
      const portal = fixture.debugElement.query(By.css('x-tooltip-portal'));
      portal.nativeElement.dispatchEvent(new Event('mouseenter'));
      portal.nativeElement.dispatchEvent(new Event('mouseleave'));
      fixture.detectChanges();
      await XSleep(300);
    };
    it('content.', async () => {
      component.content.set('content');
      fixture.detectChanges();
      await showPortal();
      const content = fixture.debugElement.query(By.css('.x-tooltip-portal-inner'));
      expect(content.nativeElement.innerText).toBe('content');
      await closePortal();
    });
    it('placement.', async () => {
      component.placement.set('right');
      fixture.detectChanges();
      await showPortal();
      const panel = document.querySelector('.cdk-overlay-pane')!;
      expect(panel.getBoundingClientRect().left).toBe(30);
      await closePortal();
    });
    it('visible.', async () => {
      component.visible.set(true);
      fixture.detectChanges();
      await XSleep(300);
      let tooltip = fixture.debugElement.query(By.css('.x-tooltip-portal'));
      expect(tooltip).toBeTruthy();

      component.visible.set(false);
      fixture.detectChanges();
      await XSleep(300);
      tooltip = fixture.debugElement.query(By.css('.x-tooltip-portal'));
      expect(tooltip).toBeFalsy();
    });
    it('panelClass.', async () => {
      component.panelClass.set('panel-class');
      fixture.detectChanges();
      await showPortal();
      const panel = document.querySelector('.cdk-overlay-pane');
      expect(panel).toHaveClass('panel-class');
      await closePortal();
    });
    it('connectTo.', async () => {
      component.connectTo.set(component.connectToRef());
      fixture.detectChanges();
      await showPortal();
      const panel = document.querySelector('.cdk-overlay-pane')!;
      expect(panel.getBoundingClientRect().left).toBe(50);
      await closePortal();
    });
    it('backgroundColor.', async () => {
      component.backgroundColor.set('rgb(255, 0, 0');
      fixture.detectChanges();
      await showPortal();
      const inner = fixture.debugElement.query(By.css('.x-tooltip-portal-inner'));
      expect(XComputedStyle(inner.nativeElement, 'background-color')).toBe('rgb(255, 0, 0)');
      await closePortal();
    });
    it('color.', async () => {
      component.color.set('rgb(255, 0, 0');
      fixture.detectChanges();
      await showPortal();
      const inner = fixture.debugElement.query(By.css('.x-tooltip-portal-inner'));
      expect(XComputedStyle(inner.nativeElement, 'color')).toBe('rgb(255, 0, 0)');
      await closePortal();
    });
    it('manual.', async () => {
      component.manual.set(true);
      fixture.detectChanges();
      await showPortal();
      let tooltip = fixture.debugElement.query(By.css('.x-tooltip-portal'));
      expect(tooltip).toBeFalsy();

      component.visible.set(true);
      fixture.detectChanges();
      await XSleep(300);
      tooltip = fixture.debugElement.query(By.css('.x-tooltip-portal'));
      expect(tooltip).toBeTruthy();
    });
    it('mouseEnterDelay.', async () => {
      const com = fixture.debugElement.query(By.directive(XTooltipDirective));
      com.nativeElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      let tooltip = fixture.debugElement.query(By.css('.x-tooltip-portal'));
      expect(tooltip).toBeFalsy();
      await XSleep(200);
      tooltip = fixture.debugElement.query(By.css('.x-tooltip-portal'));
      expect(tooltip).toBeTruthy();
      await closePortal();
    });
    it('mouseLeaveDelay.', async () => {
      const com = fixture.debugElement.query(By.directive(XTooltipDirective));
      com.nativeElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      await XSleep(200);
      com.nativeElement.dispatchEvent(new Event('mouseleave'));
      await XSleep(50);
      let tooltip = fixture.debugElement.query(By.css('.x-tooltip-portal'));
      expect(tooltip).toBeTruthy();
      await XSleep(150);
      tooltip = fixture.debugElement.query(By.css('.x-tooltip-portal'));
      expect(tooltip).toBeFalsy();
    });
    it('disabled.', async () => {
      component.disabled.set(true);
      fixture.detectChanges();
      await showPortal();
      let tooltip = fixture.debugElement.query(By.css('.x-tooltip-portal'));
      expect(tooltip).toBeFalsy();
    });
  });
});
