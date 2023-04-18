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
  AfterViewInit
} from '@angular/core';
import { XSliderSelectProperty, XSliderSelectPrefix } from './slider-select.property';
import { XIsEmpty, XIsUndefined, XResize, XClearClass, XConfigService, XResizeObserver } from '@ng-nest/ui/core';
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
  @ViewChild('dragRef', { static: true }) dragRef!: ElementRef<HTMLElement>;
  @ViewChild('railRef', { static: true }) railRef!: ElementRef<HTMLElement>;
  @ViewChild('processRef', { static: true }) processRef!: ElementRef<HTMLElement>;
  @ViewChild(XTooltipDirective, { static: true }) tooltip!: XTooltipDirective;
  left: number = 0;
  visible: boolean = false;
  manual: boolean = false;
  start!: number;
  override value = 0;
  displayValue = '0';
  private _unSubject = new Subject<void>();
  private _resizeObserver!: XResizeObserver;

  override get requiredIsEmpty() {
    return this.validator && this.required && (XIsEmpty(this.value) || this.value === 0);
  }

  override writeValue(value: number) {
    if (value === null) value = 0;
    this.value = value;
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
  }

  ngOnDestroy(): void {
    this._unSubject.next();
    this._unSubject.unsubscribe();
    this._resizeObserver?.disconnect();
  }

  change() {
    const val = Number(((Number(this.max) - Number(this.min)) * Number(this.left)) / 100 + Number(this.min)).toFixed(
      Number(this.precision)
    );
    this.value = parseFloat(val);
    this.setDisplayValue();
    if (this.onChange) this.onChange(this.value);
  }

  setClassMap() {
    XClearClass(this.labelMap);
    this.labelMap[`x-text-align-${this.labelAlign}`] = this.labelAlign ? true : false;
  }

  setLeft() {
    this.left = Math.round(((this.value - Number(this.min)) * 100) / (Number(this.max) - Number(this.min)));
    const start = this.left;
    this.start = start;
    this.setDrag();
    this.cdr.detectChanges();
  }

  setDisplayValue() {
    this.displayValue = Number(this.value).toFixed(Number(this.precision));
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

  onInnerClick(_$event: MouseEvent) {}

  started(drag: CdkDragStart) {
    const start = this.left;
    this.start = start;
    if (this.showTooltip) {
      this.manual = true;
      this.visible = true;
    }
    this.cdr.detectChanges();
    this.formControlValidator();
    this.dragStartEmit.emit(drag);
  }

  moved(drag: CdkDragMove) {
    let transform = drag.source.getFreeDragPosition();
    this.setDrag(transform.x);
    drag.source.reset();
    if (this.showTooltip) {
      this.tooltip.updatePortal();
    }
    this.change();
    this.dragMoveEmit.emit(drag);
  }

  ended(drag: CdkDragEnd) {
    if (this.showTooltip) {
      this.manual = false;
      this.visible = false;
    }
    this.cdr.detectChanges();
    this.dragEndEmit.emit(drag);
  }

  setDrag(distance: number = 0) {
    let railBox = this.railRef.nativeElement.getBoundingClientRect();
    let stepWidth = railBox.width / ((Number(this.max) - Number(this.min)) / Number(this.step));
    let offset = Math.abs(distance % stepWidth);
    let dis =
      offset < stepWidth / 2
        ? distance > 0
          ? distance - offset
          : distance + offset
        : distance > 0
        ? distance + stepWidth - offset
        : distance - stepWidth + offset;
    let x = (this.start / 100) * railBox.width + dis;
    this.left = Math.round((x / railBox.width) * 100);
    this.renderer.setStyle(this.dragRef.nativeElement, 'left', `${this.left}%`);
    this.renderer.setStyle(this.processRef.nativeElement, 'width', `${this.left}%`);
    this.renderer.removeStyle(this.dragRef.nativeElement, 'transform');
  }

  formControlChanges() {
    this.ngOnInit();
    this.cdr.detectChanges();
  }
}
