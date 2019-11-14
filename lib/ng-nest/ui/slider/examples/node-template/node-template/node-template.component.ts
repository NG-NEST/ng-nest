import { Component, OnInit } from "@angular/core";
import { XData } from "@ng-nest/ui/core";
import { XSliderNode } from "@ng-nest/ui/slider";

@Component({
  selector: "ex-node-template",
  templateUrl: "./node-template.component.html",
  styleUrls: ["./node-template.component.scss"]
})
export class ExNodeTemplateComponent implements OnInit {
  data: XData<XSliderNode[]> = [
    { key: 1, label: "上", icon: "ado-up-square" },
    { key: 2, label: "下", icon: "ado-down-square" },
    { key: 3, label: "左", icon: "ado-left-square" },
    { key: 4, label: "右", icon: "ado-right-square" }
  ];
  constructor() {}

  ngOnInit() {}
}
