import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal, TemplateRef, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XSliderComponent, XSliderLayout, XSliderNode, XSliderPrefix, XSliderTrigger } from '@ng-nest/ui/slider';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XDataArray, XJustify, XSize } from '@ng-nest/ui/core';

@Component({
  standalone: true,
  imports: [XSliderComponent],
  template: ` <x-slider> </x-slider> `
})
class XTestSliderComponent {}

@Component({
  standalone: true,
  imports: [XSliderComponent],
  template: `
    <x-slider
      [data]="data()"
      [animated]="animated()"
      [(activatedIndex)]="activatedIndex"
      [trigger]="trigger()"
      [layout]="layout()"
      [justify]="justify()"
      [nodeJustify]="nodeJustify()"
      [nodeTpl]="nodeTpl()"
      [size]="size()"
      [showExpand]="showExpand()"
      [autoShowArrow]="autoShowArrow()"
      [expandMaxHeight]="expandMaxHeight()"
      [showAnchor]="showAnchor()"
      (indexChange)="indexChange($event)"
      (nodeChange)="nodeChange($event)"
    >
    </x-slider>

    <ng-template #nodeTemplate let-node="$node">{{ node.label }}</ng-template>
  `
})
class XTestSliderPropertyComponent {
  data = signal<XDataArray<XSliderNode>>([]);
  animated = signal(true);
  activatedIndex = signal(0);
  trigger = signal<XSliderTrigger>('click');
  layout = signal<XSliderLayout>('row');
  justify = signal<XJustify>('start');
  nodeJustify = signal<XJustify>('center');
  nodeTpl = signal<TemplateRef<any> | null>(null);
  nodeTemplate = viewChild<TemplateRef<any>>('nodeTemplate');
  size = signal<XSize>('medium');
  showExpand = signal(false);
  autoShowArrow = signal(true);
  expandMaxHeight = signal('15rem');
  showAnchor = signal(false);

  indexChangeResult = signal<number | null>(null);
  indexChange(index: number) {
    this.indexChangeResult.set(index);
  }

  nodeChangeResult = signal<XSliderNode | null>(null);
  nodeChange(node: XSliderNode) {
    this.nodeChangeResult.set(node);
  }
}

describe(XSliderPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestSliderComponent, XTestSliderPropertyComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe('default.', () => {
    let fixture: ComponentFixture<XTestSliderComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestSliderComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XSliderComponent));
      expect(com).toBeDefined();
    });
  });
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestSliderPropertyComponent>;
    // let component: XTestSliderPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestSliderPropertyComponent);
      // component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('data.', () => {
      expect(true).toBe(true);
    });
    it('animated.', () => {
      expect(true).toBe(true);
    });
    it('activatedIndex.', () => {
      expect(true).toBe(true);
    });
    it('trigger.', () => {
      expect(true).toBe(true);
    });
    it('layout.', () => {
      expect(true).toBe(true);
    });
    it('justify.', () => {
      expect(true).toBe(true);
    });
    it('nodeJustify.', () => {
      expect(true).toBe(true);
    });
    it('nodeTpl.', () => {
      expect(true).toBe(true);
    });
    it('size.', () => {
      expect(true).toBe(true);
    });
    it('showExpand.', () => {
      expect(true).toBe(true);
    });
    it('autoShowArrow.', () => {
      expect(true).toBe(true);
    });
    it('expandMaxHeight.', () => {
      expect(true).toBe(true);
    });
    it('showAnchor.', () => {
      expect(true).toBe(true);
    });
    it('indexChange.', () => {
      expect(true).toBe(true);
    });
    it('nodeChange.', () => {
      expect(true).toBe(true);
    });
  });
});
