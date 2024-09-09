import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal, TemplateRef, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XMenuComponent, XMenuLayout, XMenuNode, XMenuPrefix, XMenuTrigger } from '@ng-nest/ui/menu';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XDataArray, XSize } from '@ng-nest/ui/core';

@Component({
  standalone: true,
  imports: [XMenuComponent],
  template: ` <x-menu> </x-menu> `
})
class XTestMenuComponent {}

@Component({
  standalone: true,
  imports: [XMenuComponent],
  template: `
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
      [activatedId]="activatedId"
      [target]="target()"
      [portalMinWidth]="portalMinWidth()"
      (nodeClick)="nodeClick($event)"
    >
    </x-menu>
    <ng-template #nodeTemplate let-node="$node">{{ node.label }}</ng-template>
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
  nodeTemplate = viewChild<TemplateRef<any>>('nodeTemplate');
  expandedAll = signal(false);
  expandedLevel = signal(-1);
  activatedId = signal<string | number | null>(null);
  target = signal<string | HTMLElement | null>(null);
  portalMinWidth = signal('');

  nodeClickResult = signal<XMenuNode | null>(null);
  nodeClick(node: XMenuNode) {
    this.nodeClickResult.set(node);
  }
}

describe(XMenuPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestMenuComponent, XTestMenuPropertyComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe('default.', () => {
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
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestMenuPropertyComponent>;
    // let component: XTestMenuPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestMenuPropertyComponent);
      // component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('data.', () => {
      expect(true).toBe(true);
    });
    it('layout.', () => {
      expect(true).toBe(true);
    });
    it('size.', () => {
      expect(true).toBe(true);
    });
    it('width.', () => {
      expect(true).toBe(true);
    });
    it('collapsed.', () => {
      expect(true).toBe(true);
    });
    it('trigger.', () => {
      expect(true).toBe(true);
    });
    it('nodeTpl.', () => {
      expect(true).toBe(true);
    });
    it('expandedAll.', () => {
      expect(true).toBe(true);
    });
    it('expandedLevel.', () => {
      expect(true).toBe(true);
    });
    it('activatedId.', () => {
      expect(true).toBe(true);
    });
    it('target.', () => {
      expect(true).toBe(true);
    });
    it('portalMinWidth.', () => {
      expect(true).toBe(true);
    });
    it('nodeClick.', () => {
      expect(true).toBe(true);
    });
  });
});
