import { Component, OnInit } from "@angular/core";
import { NuData } from "@ng-nest/ui/core";
import { NuCrumbNode, NuCrumbNodeClick } from "@ng-nest/ui/crumb";

@Component({
  selector: "ex-default",
  templateUrl: "./default.component.html",
  styleUrls: ["./default.component.scss"]
})
export class ExDefaultComponent implements OnInit {
  data: NuData<NuCrumbNode[]> = [
    { nuKey: 1, nuLabel: "首页" },
    { nuKey: 2, nuLabel: "系统管理" },
    { nuKey: 3, nuLabel: "基础信息" },
    { nuKey: 4, nuLabel: "用户管理" }
  ];
  constructor() {}

  ngOnInit() {}

  nodeClick(node: NuCrumbNodeClick) {

  }
}
