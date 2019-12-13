import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Renderer2,
  ElementRef,
  ViewChild
} from "@angular/core";
import { XSwitchInput } from "./switch.type";
import { fillDefault, XValueAccessor, XControlValueAccessor, removeNgTag } from "@ng-nest/ui/core";

@Component({
  selector: "x-switch",
  templateUrl: "./switch.component.html",
  styleUrls: ["./switch.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XSwitchComponent)]
})
export class XSwitchComponent extends XControlValueAccessor implements OnInit {
  @ViewChild("switch", { static: true }) switch: ElementRef;

  writeValue(value: any) {
    this.value = value;
    this.cdr.detectChanges();
  }

  private _default: XSwitchInput = {};

  constructor(public renderer: Renderer2, private elementRef: ElementRef, private cdr: ChangeDetectorRef) {
    super(renderer);
  }

  ngOnInit() {
    fillDefault(this, this._default);
    this.setFlex(this.switch.nativeElement, this.justify, this.align, this.direction);
    removeNgTag(this.elementRef.nativeElement);
  }

  switchClick() {
    if (this.disabled) return;
    this.value = !this.value;
    if (this.onChange) this.onChange(this.value);
    this.cdr.detectChanges();
  }
}
