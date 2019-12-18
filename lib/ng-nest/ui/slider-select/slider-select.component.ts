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
import { CdkDrag } from "@angular/cdk/drag-drop";

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
  @ViewChild("inputNumber", { static: true }) inputNumber: ElementRef;
  @ViewChild("dragRef", { static: true }) dragRef: ElementRef;
  @ViewChild("trackRef", { static: true }) trackRef: ElementRef;
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
    this.setFlex(this.inputNumber.nativeElement, this.justify, this.align, this.direction);
    removeNgTag(this.elementRef.nativeElement);
  }

  dragEnded(drag: { source: CdkDrag }) {
    let transform = drag.source._dragRef["_activeTransform"];
    let trackBox = this.trackRef.nativeElement.getBoundingClientRect();
    //this.left = (transform.x / trackBox.width) * 100;
    console.log(transform);
    this.renderer.setStyle(this.dragRef.nativeElement, "left", `${(transform.x / trackBox.width) * 100}%`);
    this.renderer.removeStyle(this.dragRef.nativeElement, "transform");
    drag.source.reset();
    //console.log(this.left);
    //
  }
}
