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
import { NuFormOption, FormPrefix, NuControl, NuFormRow } from "./nu-form.type";
import { fillDefault } from "@ng-nest/ui/core";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "nu-form",
  templateUrl: "./nu-form.component.html",
  styleUrls: ["./nu-form.component.scss"],
  // Todo: 默认模式，ng-content中的内容中的样式无法生效
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NuFormComponent implements OnInit, OnChanges {
  @Input() nuTitle: string;
  @Input() nuControls?: NuControl<any>[] | NuFormRow[];

  formGroup: FormGroup;

  controlsType: "controls" | "rows";

  private _default: NuFormOption = {};

  private _controls: NuControl<any>[] = [];

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
    if (this.nuControls && this.nuControls.length > 0) {
      this.controlsType =
        this.nuControls[0] instanceof NuControl ? "controls" : "rows";
      if (this.controlsType === "controls") {
        this._controls = this.nuControls as NuControl<any>[];
      } else if (this.controlsType === "rows") {
        for (let row of this.nuControls as NuFormRow[]) {
          this._controls = [...this._controls, ...row.nuControls];
        }
      }
    }
  }

  createFormGroup() {
    let group: any = {};
    this._controls.forEach(x => {
      group[x.nuKey] = new FormControl(x.nuValue);
    });
    this.formGroup = new FormGroup(group);
  }

  submit() {}

  private removeListen() {}
}
