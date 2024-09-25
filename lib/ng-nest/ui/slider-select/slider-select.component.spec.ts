import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XSliderSelectComponent, XSliderSelectMark, XSliderSelectPrefix } from '@ng-nest/ui/slider-select';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { XAlign, XDirection, XJustify, XTemplate } from '@ng-nest/ui/core';
import { CdkDragEnd, CdkDragMove, CdkDragStart } from '@angular/cdk/drag-drop';

@Component({
  standalone: true,
  imports: [XSliderSelectComponent],
  template: ` <x-slider-select> </x-slider-select> `
})
class XTestSliderSelectComponent {}

@Component({
  standalone: true,
  imports: [XSliderSelectComponent],
  template: `
    <x-slider-select
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
  `
})
class XTestSliderSelectPropertyComponent {
  min = signal(0);
  max = signal(100);
  step = signal(100);
  precision = signal<number | null>(null);
  showTooltip = signal(true);
  reverse = signal(false);
  vertical = signal(false);
  range = signal(false);
  customButton = signal<XTemplate | null>(null);
  marks = signal<XSliderSelectMark[]>([]);
  tooltipCustom = signal<XTemplate | null>(null);
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

describe(XSliderSelectPrefix, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [XTestSliderSelectComponent, XTestSliderSelectPropertyComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
  });
  describe('default.', () => {
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
  describe(`input.`, async () => {
    let fixture: ComponentFixture<XTestSliderSelectPropertyComponent>;
    let component: XTestSliderSelectPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestSliderSelectPropertyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('min.', () => {
      expect(true).toBe(true);
    });
    it('max.', () => {
      expect(true).toBe(true);
    });
    it('step.', () => {
      expect(true).toBe(true);
    });
    it('precision.', () => {
      expect(true).toBe(true);
    });
    it('showTooltip.', () => {
      expect(true).toBe(true);
    });
    it('reverse.', () => {
      expect(true).toBe(true);
    });
    it('vertical.', () => {
      expect(true).toBe(true);
    });
    it('range.', () => {
      expect(true).toBe(true);
    });
    it('customButton.', () => {
      expect(true).toBe(true);
    });
    it('marks.', () => {
      expect(true).toBe(true);
    });
    it('tooltipCustom.', () => {
      expect(true).toBe(true);
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
