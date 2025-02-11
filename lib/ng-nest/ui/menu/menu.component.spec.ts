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
import { XMenuComponent, XMenuLayout, XMenuNode, XMenuPrefix, XMenuTrigger } from '@ng-nest/ui/menu';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { XDataArray, XSize, XSleep } from '@ng-nest/ui/core';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  imports: [XMenuComponent],
  template: ` <x-menu> </x-menu> `
})
class XTestMenuComponent {}

@Component({
  imports: [XMenuComponent],
  template: `
    <div #targetRef style="overflow: auto; height: 100px">
      <x-menu
        [data]="data()"
        [layout]="layout()"
        [size]="size()"
        [width]="width()"
        [collapsed]="collapsed()"
        [trigger]="trigger()"
        [nodeTpl]="nodeTpl()"
        [expandedAll]="expandedAll()"
        [expandedLevel]="expandedLevel()"
        [(activatedId)]="activatedId"
        [target]="target()"
        [portalMinWidth]="portalMinWidth()"
        (nodeClick)="nodeClick($event)"
      >
      </x-menu>
      <ng-template #nodeTemplate let-node="$node">{{ node.label }} tpl</ng-template>
    </div>
  `
})
class XTestMenuPropertyComponent {
  data = signal<XDataArray<XMenuNode>>([]);
  layout = signal<XMenuLayout>('row');
  size = signal<XSize>('medium');
  width = signal('16rem');
  collapsed = signal(false);
  trigger = signal<XMenuTrigger>('hover');
  nodeTpl = signal<TemplateRef<any> | null>(null);
  nodeTemplate = viewChild.required<TemplateRef<any>>('nodeTemplate');
  expandedAll = signal(false);
  expandedLevel = signal(-1);
  activatedId = signal<string | number | null>(null);
  target = signal<string | HTMLElement | null>(null);
  targetRef = viewChild.required<ElementRef<HTMLElement>>('targetRef');
  portalMinWidth = signal('');

  nodeClickResult = signal<XMenuNode | null>(null);
  nodeClick(node: XMenuNode) {
    this.nodeClickResult.set(node);
  }
}

xdescribe(XMenuPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestMenuComponent, XTestMenuPropertyComponent],
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideExperimentalZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  xdescribe('default.', () => {
    let fixture: ComponentFixture<XTestMenuComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestMenuComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XMenuComponent));
      expect(com).toBeDefined();
    });
  });
  xdescribe(`input.`, async () => {
    let fixture: ComponentFixture<XTestMenuPropertyComponent>;
    let component: XTestMenuPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestMenuPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    const showPortal = async (trigger: 'mouseenter' | 'click' = 'mouseenter') => {
      const com = fixture.debugElement.query(By.css('.x-dropdown'));
      if (trigger === 'mouseenter') {
        com.nativeElement.dispatchEvent(new Event('mouseenter'));
      } else if (trigger === 'click') {
        const link = fixture.debugElement.query(By.css('x-dropdown'));
        link.nativeElement.click();
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
    it('data.', () => {
      component.data.set(['aa', 'bb', 'cc']);
      fixture.detectChanges();
      const menu = fixture.debugElement.query(By.css('.x-menu'));
      expect(menu.nativeElement.innerText).toBe('aa\nbb\ncc');
    });
    it('layout.', () => {
      component.data.set(['aa', 'bb', 'cc']);
      component.layout.set('column');
      fixture.detectChanges();
      const menu = fixture.debugElement.query(By.css('.x-menu'));
      expect(menu.nativeElement).toHaveClass('x-menu-column');
    });
    it('size.', () => {
      component.data.set(['aa', 'bb', 'cc']);
      component.size.set('small');
      fixture.detectChanges();
      const link = fixture.debugElement.query(By.css('x-link'));
      expect(link.nativeElement).toHaveClass('x-size-small');
    });
    it('width.', () => {
      component.data.set(['aa', 'bb', 'cc']);
      component.layout.set('column');
      component.width.set('200px');
      fixture.detectChanges();
      const menu = fixture.debugElement.query(By.css('.x-menu'));
      expect(menu.nativeElement.clientWidth).toBe(200);
    });
    it('collapsed.', () => {
      component.data.set(['aa', 'bb', 'cc']);
      component.layout.set('column');
      component.collapsed.set(true);
      fixture.detectChanges();
      const menu = fixture.debugElement.query(By.css('.x-menu'));
      expect(menu.nativeElement).toHaveClass('x-menu-collapsed');
    });
    it('trigger.', async () => {
      component.data.set([
        { id: 'aa', label: 'aa' },
        { id: 'bb', label: 'bb' },
        { id: 'cc', label: 'cc' },
        { id: 'dd', label: 'dd', pid: 'aa' }
      ]);
      fixture.detectChanges();
      let { list } = await showPortal('mouseenter');
      expect(list).toBeTruthy();
      await closePortal();
    });
    it('nodeTpl.', () => {
      component.data.set(['aa']);
      component.nodeTpl.set(component.nodeTemplate());
      fixture.detectChanges();
      const link = fixture.debugElement.query(By.css('x-link'));
      expect(link.nativeElement.innerText).toBe('aa tpl');
    });
    it('expandedAll.', () => {
      component.layout.set('column');
      component.expandedAll.set(true);
      component.data.set([
        { id: 'aa', label: 'aa' },
        { id: 'bb', label: 'bb' },
        { id: 'cc', label: 'cc' },
        { id: 'dd', label: 'dd', pid: 'aa' },
        { id: 'ee', label: 'ee', pid: 'bb' }
      ]);
      fixture.detectChanges();
      const nodes = fixture.debugElement.queryAll(By.css('.x-menu-nodes .x-menu-nodes'));
      expect(nodes.length).toBe(2);
    });
    it('expandedLevel.', () => {
      component.layout.set('column');
      component.expandedLevel.set(0);
      component.data.set([
        { id: 'aa', label: 'aa' },
        { id: 'bb', label: 'bb' },
        { id: 'cc', label: 'cc' },
        { id: 'dd', label: 'dd', pid: 'aa' },
        { id: 'ee', label: 'ee', pid: 'bb' },
        { id: 'ff', label: 'ff', pid: 'ee' }
      ]);
      fixture.detectChanges();
      const nodes = fixture.debugElement.queryAll(By.css('.x-menu-nodes .x-menu-nodes'));
      expect(nodes.length).toBe(2);
    });
    it('activatedId.', () => {
      component.layout.set('column');
      component.activatedId.set('ff');
      component.data.set([
        { id: 'aa', label: 'aa' },
        { id: 'bb', label: 'bb' },
        { id: 'cc', label: 'cc' },
        { id: 'dd', label: 'dd', pid: 'aa' },
        { id: 'ee', label: 'ee', pid: 'bb' },
        { id: 'ff', label: 'ff', pid: 'ee' }
      ]);
      fixture.detectChanges();
      const active = fixture.debugElement.query(By.css('.x-menu-node.x-activated'));
      expect(active).toBeTruthy();
      expect(active.nativeElement.innerText).toBe('ff');
    });
    it('target.', () => {
      component.target.set(component.targetRef().nativeElement);
      component.layout.set('column');
      component.activatedId.set('ff');
      component.data.set([
        { id: 'aa', label: 'aa' },
        { id: 'bb', label: 'bb' },
        { id: 'cc', label: 'cc' },
        { id: 'dd', label: 'dd', pid: 'aa' },
        { id: 'ee', label: 'ee', pid: 'bb' },
        { id: 'ff', label: 'ff', pid: 'ee' }
      ]);
      fixture.detectChanges();
      expect(component.targetRef().nativeElement.scrollTop !== 0).toBe(true);
    });
    it('portalMinWidth.', async () => {
      component.portalMinWidth.set('200px');
      component.data.set([
        { id: 'aa', label: 'aa' },
        { id: 'bb', label: 'bb' },
        { id: 'cc', label: 'cc' },
        { id: 'dd', label: 'dd', pid: 'aa' }
      ]);
      fixture.detectChanges();
      let { list } = await showPortal('mouseenter');
      expect(list.nativeElement.clientWidth).toBe(200);
    });
    it('nodeClick.', async () => {
      component.data.set([
        { id: 'aa', label: 'aa' },
        { id: 'bb', label: 'bb' },
        { id: 'cc', label: 'cc' },
        { id: 'dd', label: 'dd', pid: 'aa' }
      ]);
      fixture.detectChanges();
      let { list } = await showPortal('mouseenter');
      expect(list).toBeTruthy();
      await closePortal();

      expect(component.nodeClickResult()!.id).toBe('dd');
    });
  });
});
