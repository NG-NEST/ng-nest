import { Component, OnInit } from "@angular/core";
import { NmData } from "ng-moon/core";
import { NmCrumbNode, NmCrumbNodeClick } from "ng-moon/crumb";

@Component({
  selector: "ex-default",
  templateUrl: "./default.component.html",
  styleUrls: ["./default.component.scss"]
})
export class ExDefaultComponent implements OnInit {
  data: NmData<NmCrumbNode[]> = [
    { nmKey: 1, nmLabel: "首页" },
    { nmKey: 2, nmLabel: "系统管理" },
    { nmKey: 3, nmLabel: "基础信息" },
    { nmKey: 4, nmLabel: "用户管理" }
  ];
  constructor() {}

  ngOnInit() {}

  nodeClick(node: NmCrumbNodeClick) {
    console.log(node);
  }
}
