import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  Input,
  forwardRef
} from "@angular/core";
import {
  NmFormOption,
  NmControlType,
  NmControlOption,
  NmInputControlOption
} from "./nm-form.type";
import { fillDefault } from "../../../core/util";
import * as _ from "lodash";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { noop } from "rxjs";

@Component({
  selector: "nm-control",
  templateUrl: "./nm-control.component.html",
  styleUrls: ["./nm-control.component.scss"],
  // Todo: 默认模式，ng-content中的内容中的样式无法生效
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NmControlComponent implements OnInit, OnChanges {
  @Input() nmOption: any | NmControlOption<any>;
  // @Input() nmControlType: NmControlType;
  // @Input() nmDisabled: boolean;
  // @Input() nmReadonly: boolean;
  // @Input() nmRequired: boolean;
  // @Input() nmHidden: boolean;
  // @Input() nmKey: boolean;

  private _default: any | NmControlOption<any> = {};

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.renderer.addClass(this.elementRef.nativeElement, "nm-control");
  }

  ngOnInit() {
    fillDefault(this.nmOption, this._default);
  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnDestroy(): void {
    this.removeListen();
  }

  private removeListen() {}
}
