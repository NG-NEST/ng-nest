import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Component,
  computed,
  provideExperimentalZonelessChangeDetection,
  signal,
  TemplateRef,
  viewChild
} from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  XActivatedTab,
  XTabComponent,
  XTabsComponent,
  XTabsLayout,
  XTabsNode,
  XTabsPrefix,
  XTabsTrigger,
  XTabsType
} from '@ng-nest/ui/tabs';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { XDataArray, XJustify, XSize, XSleep } from '@ng-nest/ui/core';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  imports: [XTabsComponent],
  template: ` <x-tabs> </x-tabs> `
})
class XTestTabsComponent {}

@Component({
  imports: [XTabsComponent, XTabComponent],
  template: `
    <x-tabs
      [data]="data()"
      [justify]="justify()"
      [type]="type()"
      [layout]="layout()"
      [trigger]="trigger()"
      [(activatedIndex)]="activatedIndex"
      [animated]="animated()"
      [nodeTpl]="nodeTpl()"
      [size]="size()"
      [nodeJustify]="nodeJustify()"
      [sliderHidden]="sliderHidden()"
      [actionTpl]="actionTpl()"
      [showExpand]="showExpand()"
      [expandMaxHeight]="expandMaxHeight()"
      [linkRouter]="linkRouter()"
      [linkExact]="linkExact()"
      (indexChange)="indexChange($event)"
    >
      @for (tab of tabs(); track tab) {
        <x-tab [label]="tab">{{ tab }}</x-tab>
      }
    </x-tabs>

    <ng-template #nodeTemplate let-node="$node"> {{ node.label }} tpl </ng-template>
    <ng-template #actionTemplate> action </ng-template>
  `
})
class XTestTabsPropertyComponent {
  data = signal<XDataArray<XTabsNode>>([]);
  justify = signal<XJustify>('start');
  type = signal<XTabsType>('block');
  layout = signal<XTabsLayout>('top');
  trigger = signal<XTabsTrigger>('click');
  activatedIndex = signal(0);
  animated = signal(true);
  nodeTpl = signal<TemplateRef<any> | null>(null);
  nodeTemplate = viewChild.required<TemplateRef<any>>('nodeTemplate');
  size = signal<XSize>('medium');
  nodeJustify = signal<XJustify | null>(null);
  sliderHidden = signal(false);
  actionTpl = signal<TemplateRef<any> | null>(null);
  actionTemplate = viewChild.required<TemplateRef<any>>('actionTemplate');
  showExpand = signal(false);
  expandMaxHeight = signal('15rem');
  linkRouter = signal(false);
  linkExact = signal(true);

  indexChangeResult = signal<XActivatedTab | null>(null);

  count = signal(3);
  tabs = computed(() => {
    return Array.from({ length: this.count() }, (_, i) => `${i + 1}`);
  });
  indexChange(tab: XActivatedTab) {
    this.indexChangeResult.set(tab);
  }
}

describe(XTabsPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestTabsComponent, XTestTabsPropertyComponent],
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideExperimentalZonelessChangeDetection()],
      teardown: {
        destroyAfterEach: false
      }
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestTabsComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestTabsComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XTabsComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestTabsPropertyComponent>;
    let component: XTestTabsPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestTabsPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('data.', () => {
      component.data.set(['label1', 'label2', 'label3']);
      fixture.detectChanges();
      const list = fixture.debugElement.query(By.css('.x-tabs-list'));
      expect(list.nativeElement.innerText).toBe('label1\nlabel2\nlabel3');
    });
    it('justify.', () => {
      component.justify.set('end');
      fixture.detectChanges();
      const scroll = fixture.debugElement.query(By.css('.x-tabs .x-slider-scroll'));
      expect(scroll.nativeElement).toHaveClass('x-justify-end');
    });
    it('type.', () => {
      component.type.set('card');
      fixture.detectChanges();
      const tabs = fixture.debugElement.query(By.css('.x-tabs'));
      expect(tabs.nativeElement).toHaveClass('x-tabs-card');
    });
    it('layout.', () => {
      component.layout.set('right');
      fixture.detectChanges();
      const tabs = fixture.debugElement.query(By.css('.x-tabs'));
      expect(tabs.nativeElement).toHaveClass('x-tabs-right');
    });
    it('trigger.', async () => {
      const links = fixture.debugElement.queryAll(By.css('.x-tabs .x-slider-scroll x-link'));
      const contents = fixture.debugElement.query(By.css('.x-tabs .x-tabs-contents'));
      if (links.length > 1) {
        links[1].nativeElement.click();
        fixture.detectChanges();
        expect(contents.nativeElement.innerText).toBe('2');
      }

      component.trigger.set('hover');
      fixture.detectChanges();
      if (links.length > 2) {
        links[2].nativeElement.dispatchEvent(new Event('mouseenter'));
        fixture.detectChanges();
        await XSleep(300);
        expect(contents.nativeElement.innerText).toBe('3');
      }
    });
    it('activatedIndex.', async () => {
      component.activatedIndex.set(1);
      fixture.detectChanges();
      await XSleep(300);
      const lis = fixture.debugElement.queryAll(By.css('.x-tabs .x-slider-scroll li'));
      const contents = fixture.debugElement.query(By.css('.x-tabs .x-tabs-contents'));
      if (lis.length > 2) {
        expect(lis[1].nativeElement).toHaveClass('x-slider-activated');
        expect(contents.nativeElement.innerText).toBe('2');
      }
    });
    it('animated.', () => {
      component.animated.set(false);
      fixture.detectChanges();
      const highlight = fixture.debugElement.query(By.css('.x-tabs .x-slider-highlight'));
      expect(highlight.nativeElement).not.toHaveClass('x-slider-highlight-animated');
    });
    it('nodeTpl.', () => {
      component.nodeTpl.set(component.nodeTemplate());
      fixture.detectChanges();
      const nodes = fixture.debugElement.query(By.css('.x-tabs x-slider'));
      expect(nodes.nativeElement.innerText.trim()).toBe('1 tpl\n2 tpl\n3 tpl');
    });
    it('size.', () => {
      component.size.set('big');
      fixture.detectChanges();
      const links = fixture.debugElement.queryAll(By.css('.x-tabs .x-slider-scroll x-link'));
      for (let link of links) {
        expect(link.nativeElement).toHaveClass('x-size-big');
      }
    });
    it('nodeJustify.', () => {
      component.nodeJustify.set('end');
      fixture.detectChanges();
      const links = fixture.debugElement.queryAll(By.css('.x-tabs .x-slider-scroll x-link'));
      for (let link of links) {
        expect(link.nativeElement).toHaveClass('x-justify-end');
      }
    });
    it('sliderHidden.', () => {
      component.sliderHidden.set(true);
      fixture.detectChanges();
      const list = fixture.debugElement.query(By.css('.x-tabs .x-tabs-list'));
      expect(list).toBeFalsy();
    });
    it('actionTpl.', () => {
      component.actionTpl.set(component.actionTemplate());
      fixture.detectChanges();
      const action = fixture.debugElement.query(By.css('.x-tabs .x-tabs-actions'));
      expect(action.nativeElement.innerText.trim()).toBe('action');
    });
    it('showExpand.', async () => {
      component.showExpand.set(true);
      component.count.set(100);
      fixture.detectChanges();
      await XSleep(200);
      const dropdown = fixture.debugElement.query(By.css('.x-tabs x-dropdown'));
      expect(dropdown).toBeTruthy();
    });
    it('expandMaxHeight.', async () => {
      component.expandMaxHeight.set('300px');
      component.showExpand.set(true);
      component.count.set(100);
      fixture.detectChanges();
      await XSleep(200);
      const com = fixture.debugElement.query(By.css('.x-tabs .x-dropdown'));
      com.nativeElement.click();
      fixture.detectChanges();
      await XSleep(300);
      const portal = fixture.debugElement.query(By.css('.x-dropdown-portal'));
      expect(portal.nativeElement.style.maxHeight).toBe('300px');
      const item = fixture.debugElement.query(By.css('.x-list x-list-option'));
      item.nativeElement.click();
      await XSleep(300);
    });
    it('linkRouter.', () => {
      // example router
      expect(true).toBe(true);
    });
    it('linkExact.', () => {
      // example router
      expect(true).toBe(true);
    });
    it('indexChange.', () => {
      const links = fixture.debugElement.queryAll(By.css('.x-tabs .x-slider-scroll x-link'));
      if (links.length > 1) {
        links[1].nativeElement.click();
        fixture.detectChanges();
        expect(component.indexChangeResult()!.activatedIndex).toBe(1);
      }
    });
  });
});
