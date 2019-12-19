import { Subscription, interval } from "rxjs";
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Renderer2,
  ElementRef,
  Input,
  HostListener,
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
import { XTooltipDirective } from "../tooltip";

@Component({
  selector: "x-slider-select",
  templateUrl: "./slider-select.component.html",
  styleUrls: ["./slider-select.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XSliderSelectComponent)]
})
export class XSliderSelectComponent extends XControlValueAccessor implements OnInit {
  @Input() @XInputNumber() min: number = Number.MIN_SAFE_INTEGER;
  @Input() @XInputNumber() max: number = Number.MAX_SAFE_INTEGER;
  @Input() @XInputNumber() step: number = 1;
  @Input() @XInputNumber() debounce: number = 40;
  @Input() @XInputNumber() precision: number = 0;
  @ViewChild("sliderSelect", { static: true }) sliderSelect: ElementRef;
  @ViewChild("dragRef", { static: true }) dragRef: ElementRef;
  @ViewChild("railRef", { static: true }) railRef: ElementRef;
  @ViewChild(XTooltipDirective, { static: true }) tooltip: XTooltipDirective;
  left: number = 0;

  get getRequired() {
    return this.required && XIsEmpty(this.value);
  }

  private _default: XSliderSelectInput = {};

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

  dragStarted(drag: CdkDragStart) {
    // let transform = drag.source._dragRef["_activeTransform"];
    // let railBox = this.railRef.nativeElement.getBoundingClientRect();
    const s = this.left;
    this.start = s;
    // console.log("1", transform);
  }

  dragMoved(drag: CdkDragMove) {
    let transform = drag.source._dragRef["_activeTransform"];
    let railBox = this.railRef.nativeElement.getBoundingClientRect();
    let x = (this.start / 100) * railBox.width + transform.x;
    this.left = Math.round((x / railBox.width) * 100);
    this.tooltip.update();
  }

  dragEnded(drag: CdkDragEnd) {
    // let transform = drag.source._dragRef["_activeTransform"];
    // let railBox = this.railRef.nativeElement.getBoundingClientRect();
    // let x = (this.left / 100) * railBox.width + transform.x;
    // this.left = Math.round((x / railBox.width) * 100);
    this.renderer.setStyle(this.dragRef.nativeElement, "left", `${this.left}%`);
    this.renderer.removeStyle(this.dragRef.nativeElement, "transform");
    drag.source.reset();
  }
}
