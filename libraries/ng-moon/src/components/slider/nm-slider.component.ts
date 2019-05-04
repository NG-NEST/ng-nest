import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { SliderPrefix, NmSliderOption, NmSliderData } from "./nm-slider.type";
import { fillDefault } from "../../core/util";
import { NmData } from "../../interfaces/data.type";
import { Subject, BehaviorSubject, Observable } from "rxjs";

@Component({
  selector: "nm-slider",
  templateUrl: "./nm-slider.component.html",
  styleUrls: ["./style/index.scss"],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NmSliderComponent implements OnInit, OnChanges {
  @Input() nmData?: NmData<NmSliderData>;
  private default: NmSliderOption = {};

  @HostBinding(`class.${SliderPrefix}`) className() {
    return true;
  }

  constructor() {}

  ngOnInit() {
    fillDefault(this, this.default);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const nmDataChange = changes.nmData;
    if (nmDataChange.currentValue !== nmDataChange.previousValue) {
      if (nmDataChange.currentValue instanceof Array) {
        console.log("Array");
      } else if (nmDataChange.currentValue instanceof BehaviorSubject) {
        console.log("BehaviorSubject");
      } else if (nmDataChange.currentValue instanceof Subject) {
        console.log("Subject");
      } else if (nmDataChange.currentValue instanceof Observable) {
        console.log("Observable");
      }
    }
  }
}
