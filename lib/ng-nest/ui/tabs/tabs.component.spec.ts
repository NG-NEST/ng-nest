import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal, TemplateRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  XActivatedTab,
  XTabsComponent,
  XTabsLayout,
  XTabsNode,
  XTabsPrefix,
  XTabsTrigger,
  XTabsType
} from '@ng-nest/ui/tabs';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XDataArray, XJustify, XSize } from '@ng-nest/ui/core';

@Component({
  imports: [XTabsComponent],
  template: ` <x-tabs> </x-tabs> `
})
class XTestTabsComponent {}

@Component({
  imports: [XTabsComponent],
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
    </x-tabs>
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
  size = signal<XSize>('medium');
  nodeJustify = signal<XJustify | null>(null);
  sliderHidden = signal(false);
  actionTpl = signal<TemplateRef<any> | null>(null);
  showExpand = signal(false);
  expandMaxHeight = signal('15rem');
  linkRouter = signal(false);
  linkExact = signal(true);

  indexChangeResult = signal<XActivatedTab | null>(null);
  indexChange(tab: XActivatedTab) {
    this.indexChangeResult.set(tab);
  }
}

describe(XTabsPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestTabsComponent, XTestTabsPropertyComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
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
    // let component: XTestTabsPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestTabsPropertyComponent);
      // component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('data.', () => {
      expect(true).toBe(true);
    });
    it('justify.', () => {
      expect(true).toBe(true);
    });
    it('type.', () => {
      expect(true).toBe(true);
    });
    it('layout.', () => {
      expect(true).toBe(true);
    });
    it('trigger.', () => {
      expect(true).toBe(true);
    });
    it('activatedIndex.', () => {
      expect(true).toBe(true);
    });
    it('animated.', () => {
      expect(true).toBe(true);
    });
    it('nodeTpl.', () => {
      expect(true).toBe(true);
    });
    it('size.', () => {
      expect(true).toBe(true);
    });
    it('nodeJustify.', () => {
      expect(true).toBe(true);
    });
    it('sliderHidden.', () => {
      expect(true).toBe(true);
    });
    it('actionTpl.', () => {
      expect(true).toBe(true);
    });
    it('showExpand.', () => {
      expect(true).toBe(true);
    });
    it('expandMaxHeight.', () => {
      expect(true).toBe(true);
    });
    it('linkRouter.', () => {
      expect(true).toBe(true);
    });
    it('linkExact.', () => {
      expect(true).toBe(true);
    });
    it('indexChange.', () => {
      expect(true).toBe(true);
    });
  });
});
