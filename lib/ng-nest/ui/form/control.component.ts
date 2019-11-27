import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  Renderer2,
  ElementRef,
  Input} from "@angular/core";
import {
  XControlOption} from "./form.type";
import { fillDefault } from "@ng-nest/ui/core";

@Component({
  selector: "x-control",
  templateUrl: "./control.component.html",
  styleUrls: ["./control.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XControlComponent implements OnInit, OnChanges {
  @Input() option: any | XControlOption<any>;
  // @Input() controlType: XControlType;
  // @Input() disabled: boolean;
  // @Input() readonly: boolean;
  // @Input() required: boolean;
  // @Input() hidden: boolean;
  // @Input() key: boolean;

  private _default: any | XControlOption<any> = {};

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.renderer.addClass(this.elementRef.nativeElement, "x-control");
  }

  ngOnInit() {
    fillDefault(this.option, this._default);
  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnDestroy(): void {
    this.removeListen();
  }

  private removeListen() {}
}
