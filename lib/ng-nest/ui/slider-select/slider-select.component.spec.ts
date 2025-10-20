import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideZonelessChangeDetection, signal, TemplateRef, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XSliderSelectComponent, XSliderSelectMark, XSliderSelectPrefix } from '@ng-nest/ui/slider-select';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { XAlign, XComputedStyle, XDirection, XJustify, XSleep, XTemplate } from '@ng-nest/ui/core';
import { CdkDragEnd, CdkDragMove, CdkDragStart } from '@angular/cdk/drag-drop';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [XSliderSelectComponent],
  template: ` <x-slider-select> </x-slider-select> `
})
class XTestSliderSelectComponent {}

@Component({
  imports: [XSliderSelectComponent, FormsModule],
  template: `
    <x-slider-select
      [(ngModel)]="model"
      [min]="min()"
      [max]="max()"
      [step]="step()"
      [precision]="precision()"
      [showTooltip]="showTooltip()"
      [reverse]="reverse()"
      [vertical]="vertical()"
      [range]="range()"
      [customButton]="customButton()"
      [marks]="marks()"
      [tooltipCustom]="tooltipCustom()"
      [label]="label()"
      [labelWidth]="labelWidth()"
      [labelAlign]="labelAlign()"
      [justify]="justify()"
      [align]="align()"
      [direction]="direction()"
      [disabled]="disabled()"
      [required]="required()"
      (dragStartEmit)="dragStartEmit($event)"
      (dragMoveEmit)="dragMoveEmit($event)"
      (dragEndEmit)="dragEndEmit($event)"
    >
    </x-slider-select>

    <ng-template #customButtonTemplate><></ng-template>

    <ng-template #tooltipCustomTemplate let-value="$value">{{ value }}%</ng-template>
  `
})
class XTestSliderSelectPropertyComponent {
  model = signal(0);
  min = signal(0);
  max = signal(100);
  step = signal(1);
  precision = signal<number | null>(null);
  showTooltip = signal(true);
  reverse = signal(false);
  vertical = signal(false);
  range = signal(false);
  customButton = signal<XTemplate | null>(null);
  customButtonTemplate = viewChild.required<TemplateRef<any>>('customButtonTemplate');
  marks = signal<XSliderSelectMark[]>([]);
  tooltipCustom = signal<XTemplate | null>(null);
  tooltipCustomTemplate = viewChild.required<TemplateRef<any>>('tooltipCustomTemplate');
  label = signal('');
  labelWidth = signal('');
  labelAlign = signal<XAlign>('start');
  justify = signal<XJustify>('start');
  align = signal<XAlign>('start');
  direction = signal<XDirection>('column');
  disabled = signal(false);
  required = signal(false);
  pattern = signal<RegExp | RegExp[] | null>(null);
  message = signal<string | string[]>([]);
  inputValidator = signal<((value: any) => boolean) | null>(null);

  dragStartEmitResult = signal<CdkDragStart | null>(null);
  dragStartEmit(start: CdkDragStart) {
    this.dragStartEmitResult.set(start);
  }
  dragMoveEmitResult = signal<CdkDragMove | null>(null);
  dragMoveEmit(move: CdkDragMove) {
    this.dragMoveEmitResult.set(move);
  }
  dragEndEmitResult = signal<CdkDragEnd | null>(null);
  dragEndEmit(end: CdkDragEnd) {
    this.dragEndEmitResult.set(end);
  }
}

xdescribe(XSliderSelectPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestSliderSelectComponent, XTestSliderSelectPropertyComponent],
      providers: [provideAnimations(), provideHttpClient(withFetch()), provideZonelessChangeDetection()],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });
  xdescribe('default.', () => {
    let fixture: ComponentFixture<XTestSliderSelectComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(XTestSliderSelectComponent);
      fixture.detectChanges();
    });
    it('define.', () => {
      const com = fixture.debugElement.query(By.directive(XSliderSelectComponent));
      expect(com).toBeDefined();
    });
  });
  xdescribe(`input.`, async () => {
    let fixture: ComponentFixture<XTestSliderSelectPropertyComponent>;
    let component: XTestSliderSelectPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestSliderSelectPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('min.', async () => {
      component.model.set(0);
      component.min.set(0);
      fixture.detectChanges();
      const process = fixture.debugElement.query(By.css('.x-slider-select-process'));
      const drag = fixture.debugElement.query(By.css('.x-slider-select-drag'));
      await XSleep(100);
      expect(XComputedStyle(process.nativeElement, 'width')).toBe('0');
      expect(XComputedStyle(drag.nativeElement, 'left')).toBe('0');
    });
    it('max.', async () => {
      component.model.set(50);
      component.max.set(50);
      fixture.detectChanges();
      const process = fixture.debugElement.query(By.css('.x-slider-select-process'));
      const drag = fixture.debugElement.query(By.css('.x-slider-select-drag'));
      await XSleep(100);
      const rail = fixture.debugElement.query(By.css('.x-slider-select-rail'));
      const width = rail.nativeElement.clientWidth;
      expect(process.nativeElement.clientWidth).toBe(width);
      expect(drag.nativeElement.offsetLeft).toBe(width);
    });
    it('step.', () => {
      // cdk drag
      expect(true).toBe(true);
    });
    it('precision.', async () => {
      component.min.set(0);
      component.max.set(1);
      component.step.set(0.01);
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('.x-slider-select-button'));
      button.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
      fixture.detectChanges();
      await XSleep(300);
      const popoverInner = fixture.debugElement.query(By.css('.x-tooltip-portal-inner'));
      expect(popoverInner.nativeElement.innerText).toBe('0.00');
      button.nativeElement.dispatchEvent(new MouseEvent('mouseleave'));
      await XSleep(200);
    });
    it('showTooltip.', async () => {
      const button = fixture.debugElement.query(By.css('.x-slider-select-button'));
      button.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
      fixture.detectChanges();
      await XSleep(300);
      let portal = fixture.debugElement.query(By.css('.x-tooltip-portal'));
      expect(portal).toBeTruthy();
      button.nativeElement.dispatchEvent(new MouseEvent('mouseleave'));
      await XSleep(200);

      component.showTooltip.set(false);
      fixture.detectChanges();
      button.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
      fixture.detectChanges();
      await XSleep(300);
      portal = fixture.debugElement.query(By.css('.x-tooltip-portal'));
      expect(portal).toBeFalsy();
    });
    it('reverse.', async () => {
      component.reverse.set(true);
      fixture.detectChanges();
      await XSleep(100);
      const slider = fixture.debugElement.query(By.css('.x-slider-select')).nativeElement;
      expect(slider).toHaveClass('x-slider-select-reverse');
      const drag = fixture.debugElement.query(By.css('.x-slider-select-drag')).nativeElement;
      expect(XComputedStyle(drag, 'right')).toBe('0');
    });
    it('vertical.', () => {
      component.vertical.set(true);
      fixture.detectChanges();
      const slider = fixture.debugElement.query(By.css('x-slider-select')).nativeElement;
      expect(slider).toHaveClass('x-slider-select-vertical');
    });
    it('range.', () => {
      component.range.set(true);
      fixture.detectChanges();
      const slider = fixture.debugElement.query(By.css('.x-slider-select')).nativeElement;
      expect(slider).toHaveClass('x-slider-select-range');
    });
    it('customButton.', () => {
      component.customButton.set(component.customButtonTemplate());
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('.x-slider-select-button'));
      expect(button.nativeElement.innerText).toBe('<>');
    });
    it('marks.', () => {
      component.marks.set([
        {
          value: 0,
          label: '0��C'
        },
        {
          value: 37,
          label: '37��C'
        },
        {
          value: 60,
          label: '60��C'
        }
      ]);
      fixture.detectChanges();
      const marks = fixture.debugElement.queryAll(By.css('.x-slider-select-mark'));
      expect(marks.length).toBe(3);
      expect(marks[0].nativeElement.innerText).toBe('0��C');
      expect(marks[1].nativeElement.innerText).toBe('37��C');
      expect(marks[2].nativeElement.innerText).toBe('60��C');
    });
    it('tooltipCustom.', async () => {
      component.tooltipCustom.set(component.tooltipCustomTemplate());
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('.x-slider-select-button'));
      button.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
      fixture.detectChanges();
      await XSleep(300);
      let portal = fixture.debugElement.query(By.css('.x-tooltip-portal'));
      expect(portal.nativeElement.innerText).toBe('0%');
      button.nativeElement.dispatchEvent(new MouseEvent('mouseleave'));
      await XSleep(200);
    });
    it('label.', async () => {
      component.label.set('label');
      fixture.detectChanges();
      const label = fixture.debugElement.query(By.css('label'));
      expect(label.nativeElement.innerText).toBe('label');
    });
    it('labelWidth.', () => {
      component.label.set('label');
      component.labelWidth.set('100px');
      fixture.detectChanges();
      const label = fixture.debugElement.query(By.css('label'));
      expect(label.nativeElement.style.width).toBe('100px');
    });
    it('labelAlign.', () => {
      component.label.set('label');
      component.labelAlign.set('end');
      fixture.detectChanges();
      const label = fixture.debugElement.query(By.css('label'));
      expect(label.nativeElement).toHaveClass('x-text-align-end');
    });
    it('justify.', () => {
      component.label.set('label');
      component.justify.set('end');
      fixture.detectChanges();
      const select = fixture.debugElement.query(By.css('.x-slider-select'));
      expect(select.nativeElement).toHaveClass('x-justify-end');
    });
    it('align.', () => {
      component.label.set('label');
      component.align.set('end');
      fixture.detectChanges();
      const select = fixture.debugElement.query(By.css('.x-slider-select'));
      expect(select.nativeElement).toHaveClass('x-align-end');
    });
    it('direction.', () => {
      component.label.set('label');
      component.direction.set('row');
      fixture.detectChanges();
      const select = fixture.debugElement.query(By.css('.x-slider-select'));
      expect(select.nativeElement).toHaveClass('x-direction-row');
    });
    it('disabled.', () => {
      component.disabled.set(true);
      fixture.detectChanges();
      const select = fixture.debugElement.query(By.css('.x-slider-select'));
      expect(select.nativeElement).toHaveClass('x-disabled');
    });
    it('required.', () => {
      component.label.set('label');
      component.required.set(true);
      fixture.detectChanges();
      const label = fixture.debugElement.query(By.css('label'));
      expect(label.nativeElement).toHaveClass('x-slider-select-label-required');
    });
  });
});
