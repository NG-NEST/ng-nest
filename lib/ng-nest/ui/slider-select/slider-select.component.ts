import { XTooltipDirective } from '@ng-nest/ui/tooltip';
import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Renderer2,
  ElementRef,
  OnDestroy,
  AfterViewInit,
  HostBinding,
  inject,
  signal,
  viewChild,
  viewChildren,
  computed
} from '@angular/core';
import { XSliderSelectProperty, XSliderSelectPrefix, XSliderSelectMark } from './slider-select.property';
import { XIsEmpty, XIsUndefined, XResize, XResizeObserver, XIsNumber, XIsArray, XIsNull } from '@ng-nest/ui/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { XValueAccessor } from '@ng-nest/ui/base-form';
import { NgClass, NgStyle } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XDragDirective } from '@ng-nest/ui/drag';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import type { CdkDragMove, CdkDragStart, CdkDragEnd } from '@angular/cdk/drag-drop';

@Component({
  selector: `${XSliderSelectPrefix}`,
  standalone: true,
  imports: [
    NgClass,
    NgStyle,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    XTooltipDirective,
    XDragDirective,
    XOutletDirective
  ],
  templateUrl: './slider-select.component.html',
  styleUrls: ['./slider-select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XSliderSelectComponent)]
})
export class XSliderSelectComponent extends XSliderSelectProperty implements OnDestroy, AfterViewInit {
  sliderSelect = viewChild.required<ElementRef<HTMLElement>>('sliderSelect');
  dragStartRef = viewChild.required<ElementRef<HTMLElement>>('dragStartRef');
  dragEndRef = viewChild.required<ElementRef<HTMLElement>>('dragEndRef');
  railRef = viewChild.required<ElementRef<HTMLElement>>('railRef');
  processRef = viewChild.required<ElementRef<HTMLElement>>('processRef');
  @HostBinding('class.x-slider-select-vertical') get getVertical() {
    return this.vertical();
  }
  tooltips = viewChildren(XTooltipDirective);
  tooltipStart = computed(() => {
    if (this.tooltips().length > 0) {
      return this.tooltips()![0];
    }
    return null;
  });
  tooltipEnd = computed(() => {
    if (this.tooltips().length > 1) {
      return this.tooltips()![1];
    }
    return null;
  });

  override value = signal<number | number[]>(0);

  startOffset = signal(0);
  startVisible = signal(false);
  startManual = signal(false);
  start = signal<number | null>(null);
  startDisplayValue = signal('0');
  showStartTooltip = signal(true);

  endOffset = signal(0);
  endVisible = signal(false);
  endManual = signal(false);
  end = signal<number | null>(null);
  endDisplayValue = signal('0');
  showEndTooltip = signal(true);

  markList = computed(() => {
    if (!this.marks()) return [];
    const marks: XSliderSelectMark[] = [];
    for (let mark of this.marks()) {
      const mk: XSliderSelectMark = {
        value: mark.value,
        label: mark.label,
        style: { ...mark.style }
      };
      mk.offset = this.getOffset(mark.value);

      if (this.reverse()) {
        if (this.vertical()) {
          mk.style!['top'] = `${mk.offset}%`;
        } else {
          mk.style!['right'] = `${mk.offset}%`;
        }
      } else {
        if (this.vertical()) {
          mk.style!['bottom'] = `${mk.offset}%`;
        } else {
          mk.style!['left'] = `${mk.offset}%`;
        }
      }
      marks.push(mk);
    }
    return marks;
  });

  private unSubject = new Subject<void>();
  private resizeObserver!: XResizeObserver;
  isNumber = computed(() => XIsNumber(this.value()) && !XIsArray(this.value()));
  isArray = computed(() => XIsArray(this.value()));

  classMap = computed(() => ({
    [`x-justify-${this.justify()}`]: !!this.justify(),
    [`x-align-${this.align()}`]: !!this.align(),
    [`x-direction-${this.direction()}`]: !!this.direction()
  }));
  labelMapSignal = computed(() => ({
    [`x-text-align-${this.labelAlign()}`]: !!this.labelAlign()
  }));

  precisionSignal = computed(() => {
    const precision = this.precision();
    if (XIsUndefined(precision) || !XIsEmpty(this.step())) {
      let stepStr = String(this.step());
      console.log(stepStr);
      let indexpoint = stepStr.indexOf('.');
      if (indexpoint === -1) {
        return 0;
      } else {
        return stepStr.length - (indexpoint + 1);
      }
    }
    return precision;
  });

  override requiredIsEmpty = computed(
    () => this.validatorComputed() && this.requiredComputed() && (XIsEmpty(this.value()) || this.value() === 0)
  );

  override writeValue(value: number | number[]) {
    if (XIsNull(value) || XIsUndefined(value)) {
      if (this.range()) {
        value = [this.min(), this.min()];
      } else {
        value = this.min();
      }
    }
    this.value.set(value);
    this.setLeft();
    this.setDisplayValue();
  }

  private renderer = inject(Renderer2);
  override cdr = inject(ChangeDetectorRef);
  elementRef = inject(ElementRef);

  ngAfterViewInit() {
    XResize(this.sliderSelect().nativeElement)
      .pipe(debounceTime(30), takeUntil(this.unSubject))
      .subscribe((x) => {
        this.resizeObserver = x.resizeObserver;
        this.setLeft();
        this.setDisplayValue();
      });
  }

  ngOnDestroy(): void {
    this.unSubject.next();
    this.unSubject.complete();
    this.resizeObserver?.disconnect();
  }

  change() {
    const getVal = (offset: number) => {
      console.log(((this.max() - this.min()) * offset) / 100 + this.min(), this.precisionSignal());
      return parseFloat(
        Number(((this.max() - this.min()) * offset) / 100 + this.min()).toFixed(this.precisionSignal())
      );
    };
    const startVal = getVal(this.startOffset());
    if (this.isNumber()) {
      this.value.set(startVal);
    } else {
      const endVal = getVal(this.endOffset());
      if (endVal < startVal) {
        this.value.set([endVal, startVal]);
      } else {
        this.value.set([startVal, endVal]);
      }
    }

    this.setDisplayValue();
    if (this.onChange) this.onChange(this.value());
  }

  getOffset(val: number) {
    console.log(val, ((val + (this.reverse() ? -this.min() : this.min())) * 100) / (this.max() - this.min()));
    return Math.abs(
      Math.round(((val + (this.reverse() ? -this.min() : this.min())) * 100) / (this.max() - this.min()))
    );
  }

  setLeft() {
    let startVal = 0,
      endVal = 0;
    const value = this.value();
    if (this.isNumber()) {
      startVal = value as number;
    } else if (XIsArray(value) && value.length > 1) {
      startVal = value[0];
      endVal = value[1];
      this.endOffset.set(this.getOffset(endVal));
      this.end.set(this.endOffset());
    }

    this.startOffset.set(this.getOffset(startVal));
    this.start.set(this.startOffset());

    this.setDrag();
  }

  setDisplayValue() {
    const displayVal = (val: number) => {
      return Number(val).toFixed(this.precisionSignal());
    };
    const value = this.value();
    if (this.isNumber()) {
      this.startDisplayValue.set(displayVal(value as number));
    } else {
      if (XIsArray(value) && value.length > 1) {
        if (this.startOffset() > this.endOffset()) {
          this.startDisplayValue.set(displayVal(value[1]));
          this.endDisplayValue.set(displayVal(value[0]));
        } else {
          this.startDisplayValue.set(displayVal(value[0]));
          this.endDisplayValue.set(displayVal(value[1]));
        }
      }
    }
  }

  started(drag: CdkDragStart, type: 'start' | 'end' | 'both' = 'start') {
    if (['start', 'both'].includes(type)) {
      const start = this.startOffset();
      this.start.set(start);
      if (this.showStartTooltip()) {
        this.startManual.set(true);
        this.startVisible.set(true);
      }
    }
    if (['end', 'both'].includes(type)) {
      const end = this.endOffset();
      this.end.set(end);
      if (this.showEndTooltip()) {
        this.endManual.set(true);
        this.endVisible.set(true);
      }
    }
    this.formControlValidator();
    this.dragStartEmit.emit(drag);
  }

  moved(drag: CdkDragMove, type: 'start' | 'end' | 'both' = 'start') {
    let transform = drag.source.getFreeDragPosition();
    this.setDrag(this.vertical() ? transform.y : transform.x, type);
    drag.source.reset();
    if (['start', 'both'].includes(type) && this.showStartTooltip()) {
      this.tooltipStart()?.updatePortal();
    }
    if (['end', 'both'].includes(type) && this.showEndTooltip()) {
      this.tooltipEnd()?.updatePortal();
    }
    this.change();
    this.dragMoveEmit.emit(drag);
  }

  ended(drag: CdkDragEnd, type: 'start' | 'end' | 'both' = 'start') {
    if (['start', 'both'].includes(type)) {
      if (this.showStartTooltip()) {
        this.startManual.set(false);
        this.startVisible.set(false);
      }
    }
    if (['end', 'both'].includes(type)) {
      if (this.showEndTooltip()) {
        this.endManual.set(false);
        this.endVisible.set(false);
      }
    }
    this.dragEndEmit.emit(drag);
  }

  setDrag(distance: number = 0, type: 'start' | 'end' | 'both' = 'both') {
    if (typeof this.railRef().nativeElement.getBoundingClientRect !== 'function') return;
    let railBox = this.railRef().nativeElement.getBoundingClientRect();
    let railBoxLength = this.vertical() ? railBox.height : railBox.width;
    let stepLength = railBoxLength / ((this.max() - this.min()) / this.step());
    let offset = Math.abs(distance % stepLength);
    let dis =
      offset < stepLength / 2
        ? distance > 0
          ? distance - offset
          : distance + offset
        : distance > 0
          ? distance + stepLength - offset
          : distance - stepLength + offset;

    const setOffset = (d: number) => {
      let x1 = (d / 100) * railBoxLength;
      if (this.vertical()) {
        x1 += this.reverse() ? dis : -dis;
      } else {
        x1 += this.reverse() ? -dis : dis;
      }
      return Math.round((x1 / railBoxLength) * 100);
    };

    if (type === 'both') {
      this.startOffset.set(setOffset(this.start()!));
      this.endOffset.set(setOffset(this.end()!));
    } else if (type === 'start') {
      this.startOffset.set(setOffset(this.start()!));
    } else if (type === 'end') {
      this.endOffset.set(setOffset(this.end()!));
    }

    this.setDragStyles();
  }

  setDragStyles() {
    if (this.vertical()) {
      if (this.isArray()) {
        const wd = Math.abs(this.endOffset() - this.startOffset());
        const lt = this.endOffset() > this.startOffset() ? this.startOffset() : this.endOffset();
        if (this.reverse()) {
          this.renderer.setStyle(this.dragStartRef().nativeElement, 'top', `${this.startOffset()}%`);
          this.renderer.setStyle(this.dragEndRef().nativeElement, 'top', `${this.endOffset()}%`);
          this.renderer.setStyle(this.processRef().nativeElement, 'top', `${lt}%`);
        } else {
          this.renderer.setStyle(this.dragStartRef().nativeElement, 'bottom', `${this.startOffset()}%`);
          this.renderer.setStyle(this.dragEndRef().nativeElement, 'bottom', `${this.endOffset()}%`);
          this.renderer.setStyle(this.processRef().nativeElement, 'bottom', `${lt}%`);
        }
        this.renderer.setStyle(this.processRef().nativeElement, 'height', `${wd}%`);
      } else {
        if (this.reverse()) {
          this.renderer.setStyle(this.dragStartRef().nativeElement, 'top', `${this.startOffset()}%`);
        } else {
          this.renderer.setStyle(this.dragStartRef().nativeElement, 'bottom', `${this.startOffset()}%`);
        }
        this.renderer.setStyle(this.processRef().nativeElement, 'height', `${this.startOffset()}%`);
      }
    } else {
      if (this.isArray()) {
        const wd = Math.abs(this.endOffset() - this.startOffset());
        const lt = this.endOffset() > this.startOffset() ? this.startOffset() : this.endOffset();
        if (this.reverse()) {
          this.renderer.setStyle(this.dragStartRef().nativeElement, 'right', `${this.startOffset()}%`);
          this.renderer.setStyle(this.dragEndRef().nativeElement, 'right', `${this.endOffset()}%`);
          this.renderer.setStyle(this.processRef().nativeElement, 'right', `${lt}%`);
        } else {
          this.renderer.setStyle(this.dragStartRef().nativeElement, 'left', `${this.startOffset()}%`);
          this.renderer.setStyle(this.dragEndRef().nativeElement, 'left', `${this.endOffset()}%`);
          this.renderer.setStyle(this.processRef().nativeElement, 'left', `${lt}%`);
        }
        this.renderer.setStyle(this.processRef().nativeElement, 'width', `${wd}%`);
      } else {
        if (this.reverse()) {
          this.renderer.setStyle(this.dragStartRef().nativeElement, 'right', `${this.startOffset()}%`);
        } else {
          this.renderer.setStyle(this.dragStartRef().nativeElement, 'left', `${this.startOffset()}%`);
        }
        this.renderer.setStyle(this.processRef().nativeElement, 'width', `${this.startOffset()}%`);
      }
    }
  }

  formControlChanges() {}
}
