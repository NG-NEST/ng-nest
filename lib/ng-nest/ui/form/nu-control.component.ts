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
  NuControlOption} from "./nu-form.type";
import { fillDefault } from "@ng-nest/ui/core";

@Component({
  selector: "nu-control",
  templateUrl: "./nu-control.component.html",
  styleUrls: ["./nu-control.component.scss"],
  // Todo: 默认模式，ng-content中的内容中的样式无法生效
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NuControlComponent implements OnInit, OnChanges {
  @Input() nuOption: any | NuControlOption<any>;
  // @Input() nuControlType: NuControlType;
  // @Input() nuDisabled: boolean;
  // @Input() nuReadonly: boolean;
  // @Input() nuRequired: boolean;
  // @Input() nuHidden: boolean;
  // @Input() nuKey: boolean;

  private _default: any | NuControlOption<any> = {};

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.renderer.addClass(this.elementRef.nativeElement, "nu-control");
  }

  ngOnInit() {
    fillDefault(this.nuOption, this._default);
  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnDestroy(): void {
    this.removeListen();
  }

  private removeListen() {}
}
