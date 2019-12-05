import { Component, OnInit } from "@angular/core";
import { XSelectNode } from "@ng-nest/ui/select";
import { XData } from "@ng-nest/ui/core";

@Component({
  selector: "ex-disabled",
  templateUrl: "./disabled.component.html",
  styleUrls: ["./disabled.component.scss"]
})
export class ExDisabledComponent implements OnInit {
  data: XData<XSelectNode[]> = [
    { key: 1, label: "QQ" },
    { key: 2, label: "微信" },
    { key: 3, label: "钉钉" },
    { key: 4, label: "微博" }
  ];
  model = 2;
  constructor() {}

  ngOnInit() {}
}
