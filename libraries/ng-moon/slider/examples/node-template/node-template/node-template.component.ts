import { Component, OnInit } from "@angular/core";
import { NmData } from "ng-moon/core";
import { NmSliderNode } from "ng-moon/slider";

@Component({
  selector: "ex-node-template",
  templateUrl: "./node-template.component.html",
  styleUrls: ["./node-template.component.scss"]
})
export class ExNodeTemplateComponent implements OnInit {
  data: NmData<NmSliderNode[]> = [
    { nmKey: 1, nmLabel: "上", icon: "ado-up-square" },
    { nmKey: 2, nmLabel: "下", icon: "ado-down-square" },
    { nmKey: 3, nmLabel: "左", icon: "ado-left-square" },
    { nmKey: 4, nmLabel: "右", icon: "ado-right-square" }
  ];
  constructor() {}

  ngOnInit() {}
}
