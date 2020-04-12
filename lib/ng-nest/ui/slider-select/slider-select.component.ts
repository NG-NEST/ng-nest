import { XTooltipDirective } from '@ng-nest/ui/tooltip';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Renderer2,
  ElementRef,
  ViewChild
} from '@angular/core';
import { XSliderSelectProperty, XSliderSelectPrefix } from './slider-select.property';
import { XIsEmpty, XValueAccessor, XIsUndefined } from '@ng-nest/ui/core';
import { CdkDragMove, CdkDragStart, CdkDragEnd } from '@angular/cdk/drag-drop';

@Component({
  selector: `${XSliderSelectPrefix}`,
  templateUrl: './slider-select.component.html',
  styleUrls: ['./slider-select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XSliderSelectComponent)]
})
export class XSliderSelectComponent extends XSliderSelectProperty implements OnInit {
  @ViewChild('sliderSelect', { static: true }) sliderSelect: ElementRef;
  @ViewChild('dragRef', { static: true }) dragRef: ElementRef;
  @ViewChild('railRef', { static: true }) railRef: ElementRef;
  @ViewChild('processRef', { static: true }) processRef: ElementRef;
  @ViewChild(XTooltipDirective, { static: true }) tooltip: XTooltipDirective;
  left: number = 0;
  visible: boolean = false;
  start: number;
  value = 0;
  displayValue = '0';

  get getRequired() {
    return this.required && XIsEmpty(this.value);
  }

  writeValue(value: number) {
    if (value === null) value = 0;
    this.value = value;
    this.setLeft();
    this.setDisplayValue();
    this.cdr.detectChanges();
  }

  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {
    super(renderer);
  }

  ngOnInit() {
    this.setFlex(this.sliderSelect.nativeElement, this.justify, this.align, this.direction);
    this.setPrecision();
  }

  ngAfterViewInit() {
    this.setLeft();
    this.setDisplayValue();
  }

  change() {
    const val = Number(((this.max - this.min) * this.left) / 100 + this.min).toFixed(this.precision);
    this.value = parseFloat(val);
    this.setDisplayValue();
    if (this.onChange) this.onChange(this.value);
  }

  setLeft() {
    this.left = Math.round(((this.value - this.min) * 100) / (this.max - this.min));
    const start = this.left;
    this.start = start;
    this.setDrag();
    this.cdr.detectChanges();
  }

  setDisplayValue() {
    this.displayValue = Number(this.value).toFixed(this.precision);
  }

  setPrecision() {
    if (XIsUndefined(this.precision)) {
      let stepStr = String(this.step);
      let indexpoint = stepStr.indexOf('.');
      if (indexpoint === -1) {
        this.precision = 0;
      } else {
        this.precision = stepStr.length - (indexpoint + 1);
      }
    }
  }

  started(drag: CdkDragStart) {
    const start = this.left;
    this.start = start;
    this.visible = true;
    this.tooltip.show();
    this.cdr.detectChanges();
    this.dragStarted.emit(drag);
  }

  moved(drag: CdkDragMove) {
    let transform = drag.source.getFreeDragPosition();
    this.setDrag(transform.x);
    drag.source.reset();
    this.tooltip.updatePortal();
    this.change();
    this.dragMoved.emit(drag);
  }

  ended(drag: CdkDragEnd) {
    this.visible = false;
    this.tooltip.hide();
    this.cdr.detectChanges();
    this.dragEnded.emit(drag);
  }

  setDrag(distance: number = 0) {
    let railBox = this.railRef.nativeElement.getBoundingClientRect();
    let stepWidth = railBox.width / ((this.max - this.min) / this.step);
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
}
