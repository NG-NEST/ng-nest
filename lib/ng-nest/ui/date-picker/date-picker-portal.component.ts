import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Inject,
  ChangeDetectorRef,
  OnInit,
  ElementRef
} from "@angular/core";
import { XDatePickerNode, XDatePickerPortal } from "./date-picker.type";
import { XIsEmpty, removeNgTag } from "@ng-nest/ui/core";

@Component({
  selector: "x-date-picker-portal",
  templateUrl: "./date-picker-portal.component.html",
  styleUrls: ["./date-picker-portal.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XDatePickerPortalComponent implements OnInit {
  values = [];

  constructor(
    private elementRef: ElementRef,
    @Inject(XDatePickerPortal) public option: any,
    public cdr: ChangeDetectorRef
  ) {
    if (!XIsEmpty(this.option.value)) {
      this.setDefault();
    }
  }

  ngOnInit(): void {}

  setDefault() {}

  nodeClick(node: XDatePickerNode) {}
}
