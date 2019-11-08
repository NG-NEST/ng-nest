import { Component, OnInit } from "@angular/core";
import { NuData } from "@ng-nest/ui/core";
import { NuSliderNode } from "@ng-nest/ui/slider";

@Component({
  selector: "ex-node-template",
  templateUrl: "./node-template.component.html",
  styleUrls: ["./node-template.component.scss"]
})
export class ExNodeTemplateComponent implements OnInit {
  data: NuData<NuSliderNode[]> = [
    { nuKey: 1, nuLabel: "上", icon: "ado-up-square" },
    { nuKey: 2, nuLabel: "下", icon: "ado-down-square" },
    { nuKey: 3, nuLabel: "左", icon: "ado-left-square" },
    { nuKey: 4, nuLabel: "右", icon: "ado-right-square" }
  ];
  constructor() {}

  ngOnInit() {}
}
