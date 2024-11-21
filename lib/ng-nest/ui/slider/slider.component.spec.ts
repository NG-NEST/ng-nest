import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal, TemplateRef, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XSliderComponent, XSliderLayout, XSliderNode, XSliderPrefix, XSliderTrigger } from '@ng-nest/ui/slider';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { XDataArray, XJustify, XSize, XSleep } from '@ng-nest/ui/core';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  imports: [XSliderComponent],
  template: ` <x-slider> </x-slider> `
})
class XTestSliderComponent {}

@Component({
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

    <ng-template #nodeTemplate let-node="$node">{{ node.label }} tpl</ng-template>
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
  nodeTemplate = viewChild.required<TemplateRef<any>>('nodeTemplate');
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
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideExperimentalZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
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
    let component: XTestSliderPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestSliderPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('data.', () => {
      component.data.set(['aa', 'bb', 'cc']);
      fixture.detectChanges();
      const slider = fixture.debugElement.query(By.css('.x-slider'));
      expect(slider.nativeElement.innerText).toBe('aa\nbb\ncc');
    });
    it('animated.', () => {
      component.data.set(['aa', 'bb', 'cc']);
      fixture.detectChanges();
      const highlight = fixture.debugElement.query(By.css('.x-slider-highlight'));
      expect(highlight.nativeElement).toHaveClass('x-slider-highlight-animated');

      component.animated.set(false);
      fixture.detectChanges();
      expect(highlight.nativeElement).not.toHaveClass('x-slider-highlight-animated');
    });
    it('activatedIndex.', () => {
      component.data.set(['aa', 'bb', 'cc']);
      fixture.detectChanges();
      let li = fixture.debugElement.query(By.css('.x-slider-scroll ul li:nth-child(1)')).nativeElement;
      expect(li).toHaveClass('x-slider-activated');

      component.activatedIndex.set(1);
      fixture.detectChanges();
      li = fixture.debugElement.query(By.css('.x-slider-scroll ul li:nth-child(2)')).nativeElement;
      expect(li).toHaveClass('x-slider-activated');
    });
    it('trigger.', () => {
      component.data.set(['aa', 'bb', 'cc']);
      fixture.detectChanges();
      const link = fixture.debugElement.query(By.css('.x-slider-scroll ul li:nth-child(2) x-link')).nativeElement;
      link.click();
      fixture.detectChanges();
      const li = fixture.debugElement.query(By.css('.x-slider-scroll ul li:nth-child(2)')).nativeElement;
      expect(li).toHaveClass('x-slider-activated');
    });
    it('layout.', () => {
      component.layout.set('column');
      component.data.set(['aa', 'bb', 'cc']);
      fixture.detectChanges();
      const slider = fixture.debugElement.query(By.css('.x-slider'));
      expect(slider.nativeElement).toHaveClass('x-slider-column');
    });
    it('justify.', () => {
      component.justify.set('end');
      component.data.set(['aa', 'bb', 'cc']);
      fixture.detectChanges();
      const scroll = fixture.debugElement.query(By.css('.x-slider-scroll'));
      expect(scroll.nativeElement).toHaveClass('x-justify-end');
    });
    it('nodeJustify.', () => {
      component.nodeJustify.set('end');
      component.data.set(['aa', 'bb', 'cc']);
      fixture.detectChanges();
      const link = fixture.debugElement.query(By.css('.x-slider-scroll ul li x-link')).nativeElement;
      expect(link).toHaveClass('x-justify-end');
    });
    it('nodeTpl.', () => {
      component.nodeTpl.set(component.nodeTemplate());
      component.data.set(['aa', 'bb', 'cc']);
      fixture.detectChanges();
      const slider = fixture.debugElement.query(By.css('.x-slider'));
      expect(slider.nativeElement.innerText).toBe('aa tpl\nbb tpl\ncc tpl');
    });
    it('size.', () => {
      component.data.set(['aa', 'bb', 'cc']);
      component.size.set('small');
      fixture.detectChanges();
      const link = fixture.debugElement.query(By.css('.x-slider-scroll ul li x-link')).nativeElement;
      expect(link).toHaveClass('x-size-small');
    });
    it('showExpand.', async () => {
      component.showExpand.set(true);
      component.data.set(Array.from({ length: 50 }).map((_, i) => `aa${i + 1}`));
      fixture.detectChanges();
      await XSleep(200);
      const sliderAll = fixture.debugElement.query(By.css('.x-slider-all'));
      expect(sliderAll).toBeTruthy();
    });
    it('autoShowArrow.', async () => {
      component.data.set(Array.from({ length: 50 }).map((_, i) => `aa${i + 1}`));
      fixture.detectChanges();
      await XSleep(200);
      let arrowLeft = fixture.debugElement.query(By.css('.x-slider-arrow-left'));
      let arrowRight = fixture.debugElement.query(By.css('.x-slider-arrow-right'));
      expect(arrowLeft).toBeTruthy();
      expect(arrowRight).toBeTruthy();

      component.autoShowArrow.set(false);
      fixture.detectChanges();
      arrowLeft = fixture.debugElement.query(By.css('.x-slider-arrow-left'));
      arrowRight = fixture.debugElement.query(By.css('.x-slider-arrow-right'));
      expect(arrowLeft).toBeFalsy();
      expect(arrowRight).toBeFalsy();
    });
    it('expandMaxHeight.', async () => {
      component.data.set(Array.from({ length: 50 }).map((_, i) => `aa${i + 1}`));
      component.expandMaxHeight.set('200px');
      component.showExpand.set(true);
      fixture.detectChanges();
      await XSleep(200);
      const dropdown = fixture.debugElement.query(By.css('.x-dropdown'));
      dropdown.nativeElement.click();
      fixture.detectChanges();
      await XSleep(200);
      const portal = fixture.debugElement.query(By.css('.x-dropdown-portal'));
      expect(portal.nativeElement.style.maxHeight).toBe('200px');
      const item = fixture.debugElement.query(By.css('.x-list x-list-option'));
      item.nativeElement.click();
      await XSleep(300);
    });
    it('showAnchor.', () => {
      component.data.set(['aa', 'bb', 'cc']);
      component.showAnchor.set(true);
      fixture.detectChanges();
      const link = fixture.debugElement.query(By.css('.x-slider-scroll ul li .x-link'));
      expect(link.nativeElement.getAttribute('href')).toBe('#aa');
    });
    it('indexChange.', () => {
      component.data.set(['aa', 'bb', 'cc']);
      fixture.detectChanges();
      const link = fixture.debugElement.query(By.css('.x-slider-scroll ul li:nth-child(2) x-link')).nativeElement;
      link.click();
      fixture.detectChanges();
      expect(component.indexChangeResult()).toBe(1);
    });
    it('nodeChange.', () => {
      component.data.set(['aa', 'bb', 'cc']);
      fixture.detectChanges();
      const link = fixture.debugElement.query(By.css('.x-slider-scroll ul li:nth-child(2) x-link')).nativeElement;
      link.click();
      fixture.detectChanges();
      expect(component.nodeChangeResult()?.label).toBe('bb');
    });
  });
});
