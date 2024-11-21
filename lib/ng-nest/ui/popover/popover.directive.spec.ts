import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Component,
  ElementRef,
  provideExperimentalZonelessChangeDetection,
  signal,
  TemplateRef,
  viewChild
} from '@angular/core';
import { By } from '@angular/platform-browser';
import { XPopoverDirective, XPopoverPrefix, XPopoverTrigger } from '@ng-nest/ui/popover';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { XComputedStyle, XPlacement, XSleep, XTemplate } from '@ng-nest/ui/core';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  imports: [XPopoverDirective],
  template: ` <div x-popover>popover</div> `
})
class XTestPopoverComponent {}

@Component({
  imports: [XPopoverDirective],
  template: `
    <div
      style="position: absolute; left: 0; top: 0; width: 30px"
      x-popover
      [title]="title()"
      [content]="content()"
      [footer]="footer()"
      [panelClass]="panelClass()"
      [connectTo]="connectTo()"
      [placement]="placement()"
      [trigger]="trigger()"
      [width]="width()"
      [maxWidth]="maxWidth()"
      [minWidth]="minWidth()"
      [(visible)]="visible"
      [condition]="condition()"
      [mouseEnterDelay]="mouseEnterDelay()"
      [mouseLeaveDelay]="mouseLeaveDelay()"
    >
      text
    </div>
    <div #connectToRef style="position: absolute; left: 0; top: 0; width: 50px">connect to</div>

    <ng-template #footerTemplate>footer tpl</ng-template>
  `
})
class XTestPopoverPropertyComponent {
  title = signal<XTemplate>('');
  content = signal<XTemplate>('');
  footer = signal<XTemplate | null>(null);
  footerTemplate = viewChild.required<TemplateRef<any>>('footerTemplate');
  panelClass = signal<string | string[]>('');
  connectTo = signal<ElementRef<HTMLElement> | HTMLElement | null>(null);
  connectToRef = viewChild.required<ElementRef<HTMLElement>>('connectToRef');
  placement = signal<XPlacement>('top');
  trigger = signal<XPopoverTrigger>('hover');
  width = signal('');
  maxWidth = signal('10rem');
  minWidth = signal('10rem');
  visible = signal(false);
  condition = signal(false);
  mouseEnterDelay = signal(150);
  mouseLeaveDelay = signal(100);
}

describe(XPopoverPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestPopoverComponent, XTestPopoverPropertyComponent],
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideExperimentalZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestPopoverComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestPopoverComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XPopoverDirective));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestPopoverPropertyComponent>;
    let component: XTestPopoverPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestPopoverPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    const showPortal = async (type: 'click' | 'hover' = 'hover') => {
      const com = fixture.debugElement.query(By.directive(XPopoverDirective));
      if (type === 'click') {
        com.nativeElement.click();
      } else if (type === 'hover') {
        com.nativeElement.dispatchEvent(new Event('mouseenter'));
      }
      fixture.detectChanges();
      await XSleep(300);
    };
    const closePortal = async (type: 'click' | 'hover' = 'hover') => {
      const portal = fixture.debugElement.query(By.css('x-popover-portal'));
      if (type === 'hover') {
        portal.nativeElement.dispatchEvent(new Event('mouseenter'));
        portal.nativeElement.dispatchEvent(new Event('mouseleave'));
      } else if (type === 'click') {
        const back = document.querySelector('.cdk-overlay-connected-position-bounding-box')! as HTMLDivElement;
        back.click();
      }
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
    it('footer.', async () => {
      component.footer.set(component.footerTemplate());
      fixture.detectChanges();
      await showPortal();
      const footer = fixture.debugElement.query(By.css('.x-popover-portal-footer'));
      expect(footer.nativeElement.innerText).toBe('footer tpl');
      await closePortal();
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
    it('placement.', async () => {
      component.placement.set('right');
      fixture.detectChanges();
      await showPortal();
      const panel = document.querySelector('.cdk-overlay-pane')!;
      expect(panel.getBoundingClientRect().left).toBe(30);
      await closePortal();
    });
    it('trigger.', async () => {
      component.trigger.set('click');
      fixture.detectChanges();
      await showPortal('click');
      const popover = fixture.debugElement.query(By.css('.x-popover-portal'));
      expect(popover).toBeTruthy();
      await closePortal('click');
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
    it('visible.', async () => {
      component.visible.set(true);
      fixture.detectChanges();
      await XSleep(300);
      let popover = fixture.debugElement.query(By.css('.x-popover-portal'));
      expect(popover).toBeTruthy();

      component.visible.set(false);
      fixture.detectChanges();
      await XSleep(300);
      popover = fixture.debugElement.query(By.css('.x-popover-portal'));
      expect(popover).toBeFalsy();
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
    it('mouseEnterDelay.', async () => {
      const com = fixture.debugElement.query(By.directive(XPopoverDirective));
      com.nativeElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      let popover = fixture.debugElement.query(By.css('.x-popover-portal'));
      expect(popover).toBeFalsy();
      await XSleep(200);
      popover = fixture.debugElement.query(By.css('.x-popover-portal'));
      expect(popover).toBeTruthy();
      await closePortal();
    });
    it('mouseLeaveDelay.', async () => {
      const com = fixture.debugElement.query(By.directive(XPopoverDirective));
      com.nativeElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      await XSleep(200);
      com.nativeElement.dispatchEvent(new Event('mouseleave'));
      await XSleep(50);
      let popover = fixture.debugElement.query(By.css('.x-popover-portal'));
      expect(popover).toBeTruthy();
      await XSleep(150);
      popover = fixture.debugElement.query(By.css('.x-popover-portal'));
      expect(popover).toBeFalsy();
    });
  });
});
