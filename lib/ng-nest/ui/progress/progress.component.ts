import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  SimpleChanges,
  OnChanges,
  TemplateRef
} from "@angular/core";
import { XProgressPrefix, XProgressStatus } from "./progress.type";
import {
  XInputBoolean,
  XSize,
  XInputNumber,
  XIsNumber,
  XIsFunction,
  XIsString,
  XIsArray,
  XIsObjectArray,
  XIsEmpty
} from "@ng-nest/ui/core";

@Component({
  selector: `${XProgressPrefix}`,
  templateUrl: "./progress.component.html",
  styleUrls: ["./progress.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XProgressComponent implements OnInit, OnChanges {
  @Input() @XInputNumber() percent: number = 0;
  @Input() height: string = "0.5rem";
  @Input() status: XProgressStatus = "normal";
  @Input() @XInputBoolean() info: boolean = true;
  @Input() @XInputBoolean() inside: boolean = false;
  @Input() format?: Function;
  @Input() color?: string | { color: string; percent: number }[] | Function;
  @ViewChild("progress", { static: true }) progress: ElementRef;
  classMap = {};
  currentColor: string;
  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {}

  ngOnInit() {}

  ngOnChanges(simple: SimpleChanges) {
    let statusChange = simple.status;
    if (statusChange && statusChange.previousValue !== statusChange.currentValue) {
      this.setClassMap();
      this.cdr.markForCheck();
    }
    let percentChange = simple.percent;
    if (percentChange && percentChange.previousValue !== percentChange.currentValue) {
      this.setColor();
    }
  }

  setClassMap() {
    this.classMap[`${XProgressPrefix}-${this.status}`] = true;
    this.classMap[`${XProgressPrefix}-inside`] = this.inside;
  }

  setColor() {
    if (XIsEmpty(this.color)) return;
    if (XIsString(this.color)) {
      this.currentColor = this.color as string;
    } else if (XIsObjectArray(this.color)) {
      this.currentColor = this.getLevelColor(this.percent);
    } else if (XIsFunction(this.color)) {
      this.currentColor = (this.color as Function)(this.percent);
    }
  }

  getLevelColor(percent) {
    let colors = (this.color as { color: string; percent: number }[]).sort((a, b) => a.percent - b.percent);
    for (let i = 0; i < colors.length; i++) {
      if (colors[i].percent > percent) {
        return colors[i].color;
      }
    }
    return colors[colors.length - 1].color;
  }

  onFormat(percent) {
    return this.format(percent);
  }
}
