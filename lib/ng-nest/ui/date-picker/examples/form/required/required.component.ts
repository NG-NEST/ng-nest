import { Component, OnInit } from "@angular/core";
import { XDatePickerNode } from "@ng-nest/ui/date-picker";
import { XData } from "@ng-nest/ui/core";

@Component({
  selector: "ex-required",
  templateUrl: "./required.component.html",
  styleUrls: ["./required.component.scss"]
})
export class ExRequiredComponent implements OnInit {
  model: any;
  constructor() {}

  ngOnInit() {}
}
