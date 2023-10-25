import { XTooltipDirective } from '@ng-nest/ui/tooltip';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Renderer2,
  ElementRef,
  ViewChild,
  OnDestroy,
  AfterViewInit,
  HostBinding,
  ViewChildren,
  QueryList
} from '@angular/core';
import { XSliderSelectProperty, XSliderSelectPrefix } from './slider-select.property';
import {
  XIsEmpty,
  XIsUndefined,
  XResize,
  XClearClass,
  XConfigService,
  XResizeObserver,
  XIsNumber,
  XIsArray,
  XIsNull
} from '@ng-nest/ui/core';
import { CdkDragMove, CdkDragStart, CdkDragEnd } from '@angular/cdk/drag-drop';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { XValueAccessor } from '@ng-nest/ui/base-form';

@Component({
  selector: `${XSliderSelectPrefix}`,
  templateUrl: './slider-select.component.html',
  styleUrls: ['./slider-select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XSliderSelectComponent)]
})
export class XSliderSelectComponent extends XSliderSelectProperty implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('sliderSelect', { static: true }) sliderSelect!: ElementRef<HTMLElement>;
  @ViewChild('dragStartRef', { static: true }) dragStartRef!: ElementRef<HTMLElement>;
  @ViewChild('dragEndRef', { static: true }) dragEndRef!: ElementRef<HTMLElement>;
  @ViewChild('railRef', { static: true }) railRef!: ElementRef<HTMLElement>;
  @ViewChild('processRef', { static: true }) processRef!: ElementRef<HTMLElement>;
  @HostBinding('class.x-slider-select-vertical') get getVertical() {
    return this.vertical;
  }
  @ViewChildren(XTooltipDirective) tooltips!: QueryList<XTooltipDirective>;
  tooltipStart!: XTooltipDirective;
  tooltipEnd!: XTooltipDirective;

  override value: number | number[] = 0;

  startOffset: number = 0;
  startVisible: boolean = false;
  startManual: boolean = false;
  start!: number;
  startDisplayValue = '0';
  showStartTooltip = true;

  endOffset: number = 0;
  endVisible: boolean = false;
  endManual: boolean = false;
  end!: number;
  endDisplayValue = '0';
  showEndTooltip = true;

  private _unSubject = new Subject<void>();
  private _resizeObserver!: XResizeObserver;
  isNumber = true;
  isArray = false;

  override get requiredIsEmpty() {
    return this.validator && this.required && (XIsEmpty(this.value) || this.value === 0);
  }

  override writeValue(value: number | number[]) {
    if (XIsNull(value) || XIsUndefined(value)) {
      if (this.range) {
        value = [0, 0];
      } else {
        value = 0;
      }
    }
    this.value = value;
    this.isNumber = XIsNumber(this.value) && !XIsArray(this.value);
    this.isArray = XIsArray(this.value);
    this.setLeft();
    this.setDisplayValue();
  }

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef<HTMLElement>,
    public override cdr: ChangeDetectorRef,
    public configService: XConfigService
  ) {
    super();
  }

  ngOnInit() {
    this.setFlex(this.sliderSelect.nativeElement, this.renderer, this.justify, this.align, this.direction);
    this.setPrecision();
    this.setClassMap();
  }

  ngAfterViewInit() {
    XResize(this.sliderSelect.nativeElement)
      .pipe(debounceTime(30), takeUntil(this._unSubject))
      .subscribe((x) => {
        this._resizeObserver = x.resizeObserver;
        this.setLeft();
        this.setDisplayValue();
        this.cdr.detectChanges();
      });

    if (this.tooltips.length > 0) {
      this.tooltipStart = this.tooltips.first;
    }
    if (this.tooltips.length > 1) {
      this.tooltipEnd = this.tooltips.last;
    }
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
    this._resizeObserver?.disconnect();
  }

  change() {
    const getVal = (offset: number) => {
      return parseFloat(
        Number(((Number(this.max) - Number(this.min)) * Number(offset)) / 100 + Number(this.min)).toFixed(Number(this.precision))
      );
    };
    const startVal = getVal(this.startOffset);
    if (this.isNumber) {
      this.value = startVal;
    } else {
      const endVal = getVal(this.endOffset);
      if (endVal < startVal) {
        this.value = [endVal, startVal];
      } else {
        this.value = [startVal, endVal];
      }
    }

    this.setDisplayValue();
    if (this.onChange) this.onChange(this.value);
  }

  setClassMap() {
    XClearClass(this.labelMap);
    this.labelMap[`x-text-align-${this.labelAlign}`] = this.labelAlign ? true : false;
  }

  setLeft() {
    let startVal = 0,
      endVal = 0;
    const getOffset = (val: number) => {
      return Math.round(((val + (this.reverse ? Number(this.min) : -Number(this.min))) * 100) / (Number(this.max) - Number(this.min)));
    };

    if (this.isNumber) {
      startVal = this.value as number;
    } else if (XIsArray(this.value) && this.value.length > 1) {
      startVal = this.value[0];
      endVal = this.value[1];

      this.endOffset = getOffset(endVal);
      const end = this.endOffset;
      this.end = end;
    }
    this.startOffset = getOffset(startVal);
    const start = this.startOffset;
    this.start = start;

    this.setDrag();
    this.cdr.detectChanges();
  }

  setDisplayValue() {
    const displayVal = (val: number) => {
      return Number(val).toFixed(Number(this.precision));
    };
    if (this.isNumber) {
      this.startDisplayValue = displayVal(this.value as number);
    } else {
      if (XIsArray(this.value) && this.value.length > 1) {
        if (this.startOffset > this.endOffset) {
          this.startDisplayValue = displayVal(this.value[1]);
          this.endDisplayValue = displayVal(this.value[0]);
        } else {
          this.startDisplayValue = displayVal(this.value[0]);
          this.endDisplayValue = displayVal(this.value[1]);
        }
      }
    }
    this.cdr.detectChanges();
  }

  setPrecision() {
    if (XIsUndefined(this.precision) || !XIsEmpty(this.step)) {
      let stepStr = String(this.step);
      let indexpoint = stepStr.indexOf('.');
      if (indexpoint === -1) {
        this.precision = 0;
      } else {
        this.precision = stepStr.length - (indexpoint + 1);
      }
    }
  }

  started(drag: CdkDragStart, type: 'start' | 'end' = 'start') {
    if (type === 'start') {
      const start = this.startOffset;
      this.start = start;
      if (this.showStartTooltip) {
        this.startManual = true;
        this.startVisible = true;
      }
    } else if (type === 'end') {
      const end = this.endOffset;
      this.end = end;
      if (this.showEndTooltip) {
        this.endManual = true;
        this.endVisible = true;
      }
    }
    this.cdr.detectChanges();
    this.formControlValidator();
    this.dragStartEmit.emit(drag);
  }

  moved(drag: CdkDragMove, type: 'start' | 'end' = 'start') {
    let transform = drag.source.getFreeDragPosition();
    this.setDrag(this.vertical ? transform.y : transform.x, type);
    drag.source.reset();
    if (type === 'start' && this.showStartTooltip) {
      this.tooltipStart.updatePortal();
    }
    if (type === 'end' && this.showEndTooltip) {
      this.tooltipEnd.updatePortal();
    }
    this.change();
    this.dragMoveEmit.emit(drag);
  }

  ended(drag: CdkDragEnd, type: 'start' | 'end' = 'start') {
    if (type === 'start') {
      if (this.showStartTooltip) {
        this.startManual = false;
        this.startVisible = false;
      }
    } else if (type === 'end') {
      if (this.showEndTooltip) {
        this.endManual = false;
        this.endVisible = false;
      }
    }
    this.cdr.detectChanges();
    this.dragEndEmit.emit(drag);
  }

  setDrag(distance: number = 0, type: 'start' | 'end' | 'both' = 'both') {
    if (typeof this.railRef.nativeElement.getBoundingClientRect !== 'function') return;
    let railBox = this.railRef.nativeElement.getBoundingClientRect();
    let railBoxLength = this.vertical ? railBox.height : railBox.width;
    let stepLength = railBoxLength / ((Number(this.max) - Number(this.min)) / Number(this.step));
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
      if (this.vertical) {
        x1 += this.reverse ? dis : -dis;
      } else {
        x1 += this.reverse ? -dis : dis;
      }
      return Math.round((x1 / railBoxLength) * 100);
    };

    if (type === 'both') {
      this.startOffset = setOffset(this.start);
      this.endOffset = setOffset(this.end);
    } else if (type === 'start') {
      this.startOffset = setOffset(this.start);
    } else if (type === 'end') {
      this.endOffset = setOffset(this.end);
    }

    this.setDragStyles();
  }

  setDragStyles() {
    if (this.vertical) {
      if (this.isArray) {
        const wd = Math.abs(this.endOffset - this.startOffset);
        const lt = this.endOffset > this.startOffset ? this.startOffset : this.endOffset;
        if (this.reverse) {
          this.renderer.setStyle(this.dragStartRef.nativeElement, 'top', `${this.startOffset}%`);
          this.renderer.setStyle(this.dragEndRef.nativeElement, 'top', `${this.endOffset}%`);
          this.renderer.setStyle(this.processRef.nativeElement, 'top', `${lt}%`);
        } else {
          this.renderer.setStyle(this.dragStartRef.nativeElement, 'bottom', `${this.startOffset}%`);
          this.renderer.setStyle(this.dragEndRef.nativeElement, 'bottom', `${this.endOffset}%`);
          this.renderer.setStyle(this.processRef.nativeElement, 'bottom', `${lt}%`);
        }
        this.renderer.setStyle(this.processRef.nativeElement, 'height', `${wd}%`);
      } else {
        if (this.reverse) {
          this.renderer.setStyle(this.dragStartRef.nativeElement, 'top', `${this.startOffset}%`);
        } else {
          this.renderer.setStyle(this.dragStartRef.nativeElement, 'bottom', `${this.startOffset}%`);
        }
        this.renderer.setStyle(this.processRef.nativeElement, 'height', `${this.startOffset}%`);
      }
    } else {
      if (this.isArray) {
        const wd = Math.abs(this.endOffset - this.startOffset);
        const lt = this.endOffset > this.startOffset ? this.startOffset : this.endOffset;
        if (this.reverse) {
          this.renderer.setStyle(this.dragStartRef.nativeElement, 'right', `${this.startOffset}%`);
          this.renderer.setStyle(this.dragEndRef.nativeElement, 'right', `${this.endOffset}%`);
          this.renderer.setStyle(this.processRef.nativeElement, 'right', `${lt}%`);
        } else {
          this.renderer.setStyle(this.dragStartRef.nativeElement, 'left', `${this.startOffset}%`);
          this.renderer.setStyle(this.dragEndRef.nativeElement, 'left', `${this.endOffset}%`);
          this.renderer.setStyle(this.processRef.nativeElement, 'left', `${lt}%`);
        }
        this.renderer.setStyle(this.processRef.nativeElement, 'width', `${wd}%`);
      } else {
        if (this.reverse) {
          this.renderer.setStyle(this.dragStartRef.nativeElement, 'right', `${this.startOffset}%`);
        } else {
          this.renderer.setStyle(this.dragStartRef.nativeElement, 'left', `${this.startOffset}%`);
        }
        this.renderer.setStyle(this.processRef.nativeElement, 'width', `${this.startOffset}%`);
      }
    }

    this.renderer.removeStyle(this.dragStartRef.nativeElement, 'transform');
  }

  formControlChanges() {
    this.ngOnInit();
    this.cdr.detectChanges();
  }
}
