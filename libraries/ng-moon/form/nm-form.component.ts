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
  Input
} from "@angular/core";
import { NmFormOption, FormPrefix, NmControl, NmFormRow } from "./nm-form.type";
import { fillDefault } from "ng-moon/core";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "nm-form",
  templateUrl: "./nm-form.component.html",
  styleUrls: ["./nm-form.component.scss"],
  // Todo: 默认模式，ng-content中的内容中的样式无法生效
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NmFormComponent implements OnInit, OnChanges {
  @Input() nmTitle: string;
  @Input() nmControls?: NmControl<any>[] | NmFormRow[];

  formGroup: FormGroup;

  controlsType: "controls" | "rows";

  private _default: NmFormOption = {};

  private _controls: NmControl<any>[] = [];

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef
  ) {
    this.renderer.addClass(this.elementRef.nativeElement, FormPrefix);
  }

  ngOnInit() {
    fillDefault(this, this._default);
    this.getControlsType();
    this.createFormGroup();
  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnDestroy(): void {
    this.removeListen();
  }

  getControlsType() {
    if (this.nmControls && this.nmControls.length > 0) {
      this.controlsType =
        this.nmControls[0] instanceof NmControl ? "controls" : "rows";
      if (this.controlsType === "controls") {
        this._controls = this.nmControls as NmControl<any>[];
      } else if (this.controlsType === "rows") {
        for (let row of this.nmControls as NmFormRow[]) {
          this._controls = [...this._controls, ...row.nmControls];
        }
      }
    }
  }

  createFormGroup() {
    let group: any = {};
    this._controls.forEach(x => {
      group[x.nmKey] = new FormControl(x.nmValue);
    });
    this.formGroup = new FormGroup(group);
  }

  submit() {}

  private removeListen() {}
}
