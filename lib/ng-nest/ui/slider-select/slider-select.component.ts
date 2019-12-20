import { XTooltipDirective } from "@ng-nest/ui/tooltip";
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Renderer2,
  ElementRef,
  Input,
  ViewChild
} from "@angular/core";
import { XSliderSelectInput } from "./slider-select.type";
import {
  fillDefault,
  XIsEmpty,
  XValueAccessor,
  XControlValueAccessor,
  XInputNumber,
  removeNgTag
} from "@ng-nest/ui/core";
import { CdkDrag, CdkDragMove, CdkDragEnd, CdkDragStart } from "@angular/cdk/drag-drop";

@Component({
  selector: "x-slider-select",
  templateUrl: "./slider-select.component.html",
  styleUrls: ["./slider-select.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XSliderSelectComponent)]
})
export class XSliderSelectComponent extends XControlValueAccessor implements OnInit {
  @Input() @XInputNumber() min: number = 0;
  @Input() @XInputNumber() max: number = 100;
  @Input() @XInputNumber() step: number = 1;
  @Input() @XInputNumber() debounce: number = 40;
  @Input() @XInputNumber() precision: number = 0;
  @ViewChild("sliderSelect", { static: true }) sliderSelect: ElementRef;
  @ViewChild("dragRef", { static: true }) dragRef: ElementRef;
  @ViewChild("railRef", { static: true }) railRef: ElementRef;
  @ViewChild("trackRef", { static: true }) trackRef: ElementRef;
  @ViewChild("processRef", { static: true }) processRef: ElementRef;
  @ViewChild(XTooltipDirective, { static: true }) tooltip: XTooltipDirective;
  left: number = 0;
  visible: boolean = false;

  get getRequired() {
    return this.required && XIsEmpty(this.value);
  }

  private _default: XSliderSelectInput = {};

  value = 0;
  displayValue = "0";

  writeValue(value: any) {
    this.value = value;
    this.cdr.detectChanges();
  }

  constructor(public renderer: Renderer2, private elementRef: ElementRef, private cdr: ChangeDetectorRef) {
    super(renderer);
  }

  ngOnInit() {
    fillDefault(this, this._default);
    this.setFlex(this.sliderSelect.nativeElement, this.justify, this.align, this.direction);
    removeNgTag(this.elementRef.nativeElement);
  }

  start: number;

  change() {
    this.value = ((this.max - this.min) * this.left) / 100 + this.min;
    this.displayValue = Number(this.value).toFixed(this.precision);
    if (this.onChange) this.onChange(this.value);
  }

  dragStarted(drag: CdkDragStart) {
    const start = this.left;
    this.start = start;
    this.visible = true;
    this.tooltip.show();
    this.cdr.detectChanges();
  }

  dragMoved(drag: CdkDragMove) {
    let transform = drag.source._dragRef["_activeTransform"];
    let railBox = this.railRef.nativeElement.getBoundingClientRect();
    let x = (this.start / 100) * railBox.width + transform.x;
    this.left = Math.round((x / railBox.width) * 100);
    this.renderer.setStyle(this.dragRef.nativeElement, "left", `${this.left}%`);
    this.renderer.setStyle(this.processRef.nativeElement, "width", `${this.left}%`);
    this.renderer.removeStyle(this.dragRef.nativeElement, "transform");
    drag.source.reset();
    this.tooltip.update();
    this.change();
    this.cdr.detectChanges();
  }

  dragEnded(drag: CdkDragEnd) {
    this.visible = false;
    this.tooltip.hide();
    this.cdr.detectChanges();
  }
}
