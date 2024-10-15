import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XDropdownComponent, XDropdownNode, XDropdownPrefix, XDropdownTrigger } from '@ng-nest/ui/dropdown';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XDataArray, XPlacement, XSize, XSleep } from '@ng-nest/ui/core';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  standalone: true,
  imports: [XDropdownComponent],
  template: ` <x-dropdown></x-dropdown> `
})
class XTestDropdownComponent {}

@Component({
  standalone: true,
  imports: [XDropdownComponent],
  template: `
    <x-dropdown
      [data]="data()"
      [trigger]="trigger()"
      [placement]="placement()"
      [disabled]="disabled()"
      [children]="children()"
      [portalMinWidth]="portalMinWidth()"
      [portalMaxWidth]="portalMaxWidth()"
      [portalMinHeight]="portalMinHeight()"
      [portalMaxHeight]="portalMaxHeight()"
      [hoverDelay]="hoverDelay()"
      [(activatedId)]="activatedId"
      [size]="size()"
      (nodeClick)="nodeClick($event)"
    >
      dropdown
    </x-dropdown>
  `
})
class XTestDropdownPropertyComponent {
  data = signal<XDataArray<XDropdownNode>>([]);
  trigger = signal<XDropdownTrigger>('hover');
  placement = signal<XPlacement>('bottom-start');
  disabled = signal(false);
  children = signal(false);
  portalMinWidth = signal('');
  portalMaxWidth = signal('');
  portalMinHeight = signal('');
  portalMaxHeight = signal('');
  hoverDelay = signal(200);
  activatedId = signal<string | number>('');
  size = signal<XSize>('medium');

  nodeClickResult = signal<XDropdownNode | null>(null);
  nodeClick(node: XDropdownNode) {
    this.nodeClickResult.set(node);
  }
}

describe(XDropdownPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestDropdownComponent, XTestDropdownPropertyComponent],
      providers: [
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestDropdownComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestDropdownComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XDropdownComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestDropdownPropertyComponent>;
    let component: XTestDropdownPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestDropdownPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    const showPortal = async (trigger: 'mouseenter' | 'click' = 'mouseenter') => {
      const com = fixture.debugElement.query(By.css('.x-dropdown'));
      if (trigger === 'mouseenter') {
        com.nativeElement.dispatchEvent(new Event('mouseenter'));
      } else if (trigger === 'click') {
        com.nativeElement.click();
      }
      fixture.detectChanges();
      await XSleep(300);
      const list = fixture.debugElement.query(By.css('.x-list'));
      return { com, list };
    };
    const closePortal = async () => {
      const item = fixture.debugElement.query(By.css('.x-list x-list-option'));
      item.nativeElement.click();
      await XSleep(300);
    };
    it('data.', async () => {
      component.data.set(['aa', 'bb', 'cc']);
      const { list } = await showPortal();
      expect(list.nativeElement.innerText).toBe('aa\nbb\ncc');
      await closePortal();
    });
    it('trigger.', async () => {
      component.data.set(['aa']);
      component.trigger.set('click');
      fixture.detectChanges();
      await showPortal('click');
      const { list } = await showPortal();
      expect(list.nativeElement.innerText).toBe('aa');
      await closePortal();
    });
    it('placement.', () => {
      // cdk overlay. Restricted by browser window size
      // const { com } = await showPortal();
      // const portal = fixture.debugElement.query(By.css('.x-dropdown-portal'));
      // const box = com.nativeElement.getBoundingClientRect();
      // const portalRect = portal.nativeElement.getBoundingClientRect();
      // const leftDiff = box.left - portalRect.left;
      // const topDiff = box.top + box.height - portalRect.top;
      // // Pixels may be decimal points
      // expect(leftDiff >= -1 && leftDiff <= 1).toBe(true);
      // expect(topDiff >= -1 && topDiff <= 1).toBe(true);
    });
    it('disabled.', async () => {
      component.data.set(['aa']);
      fixture.detectChanges();
      await showPortal();
      let com = fixture.debugElement.query(By.css('.x-dropdown-portal'));
      expect(com).toBeTruthy();
      await closePortal();
      component.disabled.set(true);
      fixture.detectChanges();
      await showPortal();
      com = fixture.debugElement.query(By.css('.x-dropdown-portal'));
      expect(com).toBeFalsy();
    });
    it('children.', async () => {
      component.data.set([
        { id: 'aa', label: 'aa' },
        { id: 'bb', label: 'bb', children: [{ id: 'cc', label: 'cc', pid: 'bb' }] }
      ]);
      component.children.set(true);
      fixture.detectChanges();
      await showPortal();
      const option = fixture.debugElement.query(By.css('.x-list x-list-option:nth-child(2)'));
      option.nativeElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      await XSleep(300);
      const cc = fixture.debugElement.query(
        By.css('.cdk-overlay-connected-position-bounding-box:nth-child(2) .x-list x-list-option')
      );
      expect(cc.nativeElement.innerText).toBe('cc');
      await closePortal();
    });
    it('portalMinWidth.', async () => {
      component.data.set(['aa']);
      component.portalMinWidth.set('300px');
      fixture.detectChanges();
      await showPortal();
      const portal = fixture.debugElement.query(By.css('.x-dropdown-portal'));
      expect(portal.nativeElement.style.minWidth).toBe('300px');
      await closePortal();
    });
    it('portalMaxWidth.', async () => {
      component.data.set(['aa']);
      component.portalMaxWidth.set('300px');
      fixture.detectChanges();
      await showPortal();
      const portal = fixture.debugElement.query(By.css('.x-dropdown-portal'));
      expect(portal.nativeElement.style.maxWidth).toBe('300px');
      await closePortal();
    });
    it('portalMinHeight.', async () => {
      component.data.set(['aa']);
      component.portalMinHeight.set('300px');
      fixture.detectChanges();
      await showPortal();
      const portal = fixture.debugElement.query(By.css('.x-dropdown-portal'));
      expect(portal.nativeElement.style.minHeight).toBe('300px');
      await closePortal();
    });
    it('portalMaxHeight.', async () => {
      component.data.set(['aa']);
      component.portalMaxHeight.set('300px');
      fixture.detectChanges();
      await showPortal();
      const portal = fixture.debugElement.query(By.css('.x-dropdown-portal'));
      expect(portal.nativeElement.style.maxHeight).toBe('300px');
      await closePortal();
    });
    it('hoverDelay.', async () => {
      component.data.set([{ id: 'aa', label: 'aa' }]);
      fixture.detectChanges();
      const com = fixture.debugElement.query(By.css('.x-dropdown'));
      com.nativeElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      await XSleep(100);
      let list = fixture.debugElement.query(By.css('.x-list'));
      expect(list).toBeFalsy();
      await XSleep(200);
      list = fixture.debugElement.query(By.css('.x-list'));
      expect(list).toBeTruthy();
      await closePortal();

      component.hoverDelay.set(100);
      fixture.detectChanges();
      com.nativeElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      await XSleep(150);
      list = fixture.debugElement.query(By.css('.x-list'));
      expect(list).toBeTruthy();
      await closePortal();
    });
    it('activatedId.', async () => {
      component.data.set([{ id: 'aa', label: 'aa' }]);
      await showPortal();
      await closePortal();
      expect(component.activatedId()).toBe('aa');
    });
    it('size.', async () => {
      component.data.set([{ id: 'aa', label: 'aa' }]);
      component.size.set('small');
      fixture.detectChanges();
      const { list } = await showPortal();
      expect(list.nativeElement).toHaveClass('x-list-small');
    });
    it('nodeClick.', async () => {
      component.data.set([{ id: 'aa', label: 'aa' }]);
      await showPortal();
      await closePortal();
      expect(component.nodeClickResult()?.id).toBe('aa');
    });
  });
});
