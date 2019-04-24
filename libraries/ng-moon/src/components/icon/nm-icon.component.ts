import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  HostBinding
} from "@angular/core";
import { IconPrefix, NmIconOption } from "./nm-icon.type";
import { fillDefault } from "../../core/util/option";

@Component({
  selector: "nm-icon",
  templateUrl: "./nm-icon.component.html",
  styleUrls: ["./style/index.scss"],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NmIconComponent implements OnInit {
  private default: NmIconOption = {};

  @HostBinding(`class.${IconPrefix}`) className() {
    return true;
  }

  constructor() {}

  ngOnInit() {
    fillDefault(this, this.default);
  }
}
