import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  HostBinding,
  ChangeDetectorRef
} from "@angular/core";
import { AnchorPrefix, NmAnchorOption } from "./nm-anchor.type";
import { fillDefault } from "../../core/util";

@Component({
  selector: "nm-anchor, [nm-anchor]",
  templateUrl: "./nm-anchor.component.html",
  styleUrls: ["./style/index.scss"],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NmAnchorComponent implements OnInit {
  private default: NmAnchorOption = {};

  @HostBinding(`class.${AnchorPrefix}`) className() {
    return true;
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    fillDefault(this, this.default);
  }

  ngAfterViewInit() {
    // this.cdr.detectChanges();
  }
}
