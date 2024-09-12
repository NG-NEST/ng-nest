import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideExperimentalZonelessChangeDetection, signal, TemplateRef, viewChild } from '@angular/core';
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
      [pointer]="pointer()"
      [label]="label()"
      [labelWidth]="labelWidth()"
      [labelAlign]="labelAlign()"
      [justify]="justify()"
      [align]="align()"
      [direction]="direction()"
      [placeholder]="placeholder()"
      [disabled]="disabled()"
      [required]="required()"
      [readonly]="readonly()"
      [valueTpl]="valueTpl()"
      [valueTplContext]="valueTplContext()"
      [before]="before()"
      [after]="after()"
      [pattern]="pattern()"
      [message]="message()"
      [active]="active()"
      [inputValidator]="inputValidator()"
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
  pointer = signal(false);
  label = signal('');
  labelWidth = signal('');
  labelAlign = signal<XAlign>('start');
  justify = signal<XJustify>('start');
  align = signal<XAlign>('start');
  direction = signal<XDirection>('column');
  placeholder = signal('');
  disabled = signal(false);
  required = signal(false);
  readonly = signal(false);
  valueTpl = signal<TemplateRef<any> | null>(null);
  valueTplContext = signal(null);
  before = signal<XTemplate | null>(null);
  beforeTemplate = viewChild<TemplateRef<any>>('beforeTemplate');
  after = signal<XTemplate | null>(null);
  afterTemplate = viewChild<TemplateRef<any>>('afterTemplate');
  pattern = signal<RegExp | RegExp[] | null>(null);
  message = signal<string | string[]>([]);
  active = signal(false);
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
    // let component: XTestSliderSelectPropertyComponent;
    beforeEach(async () => {
      fixture = TestBed.createComponent(XTestSliderSelectPropertyComponent);
      // component = fixture.componentInstance;
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
    it('pointer.', () => {
      expect(true).toBe(true);
    });
    it('label.', () => {
      expect(true).toBe(true);
    });
    it('labelWidth.', () => {
      expect(true).toBe(true);
    });
    it('labelAlign.', () => {
      expect(true).toBe(true);
    });
    it('justify.', () => {
      expect(true).toBe(true);
    });
    it('align.', () => {
      expect(true).toBe(true);
    });
    it('direction.', () => {
      expect(true).toBe(true);
    });
    it('placeholder.', () => {
      expect(true).toBe(true);
    });
    it('disabled.', () => {
      expect(true).toBe(true);
    });
    it('required.', () => {
      expect(true).toBe(true);
    });
    it('readonly.', () => {
      expect(true).toBe(true);
    });
    it('valueTpl.', () => {
      expect(true).toBe(true);
    });
    it('valueTplContext.', () => {
      expect(true).toBe(true);
    });
    it('before.', () => {
      expect(true).toBe(true);
    });
    it('after.', () => {
      expect(true).toBe(true);
    });
    it('pattern.', () => {
      expect(true).toBe(true);
    });
    it('message.', () => {
      expect(true).toBe(true);
    });
    it('active.', () => {
      expect(true).toBe(true);
    });
    it('inputValidator.', () => {
      expect(true).toBe(true);
    });
  });
});
