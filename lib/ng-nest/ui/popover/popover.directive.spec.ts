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
import { XPlacement, XSleep, XTemplate } from '@ng-nest/ui/core';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  standalone: true,
  imports: [XPopoverDirective],
  template: ` <div x-popover>popover</div> `
})
class XTestPopoverComponent {}

@Component({
  standalone: true,
  imports: [XPopoverDirective],
  template: `
    <div
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
      const panel = fixture.debugElement.query(By.css('.cdk-overlay-pane'));
      expect(panel.nativeElement).toHaveClass('panel-class');
      await closePortal();
    });
    it('connectTo.', () => {
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
    it('visible.', () => {
      expect(true).toBe(true);
    });
    it('condition.', () => {
      expect(true).toBe(true);
    });
    it('mouseEnterDelay.', () => {
      expect(true).toBe(true);
    });
    it('mouseLeaveDelay.', () => {
      expect(true).toBe(true);
    });
  });
});
