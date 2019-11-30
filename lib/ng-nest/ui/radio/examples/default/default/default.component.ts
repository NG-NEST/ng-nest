import { Component, OnInit } from "@angular/core";
import { XRadioNode } from "@ng-nest/ui/radio";

@Component({
  selector: "ex-default",
  templateUrl: "./default.component.html",
  styleUrls: ["./default.component.scss"]
})
export class ExDefaultComponent implements OnInit {
  data: XRadioNode[] = [
    { key: 1, label: "QQ" },
    { key: 2, label: "微信" },
    { key: 3, label: "钉钉" },
    { key: 4, label: "微博" }
  ];
  model = 2;
  constructor() {}

  ngOnInit() {}
}
