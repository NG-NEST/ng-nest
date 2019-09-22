import { Component, OnInit } from "@angular/core";
import { NmData } from "ng-moon/core";
import { NmSliderNode } from "ng-moon/slider";

@Component({
  selector: "ex-border",
  templateUrl: "./border.component.html",
  styleUrls: ["./border.component.scss"]
})
export class ExBorderComponent implements OnInit {
  data: NmData<NmSliderNode[]> = [
    { nmKey: 1, nmLabel: "栅格" },
    { nmKey: 2, nmLabel: "代码高亮" },
    { nmKey: 3, nmLabel: "SVG图标" },
    { nmKey: 4, nmLabel: "滑块" }
  ];
  constructor() {}

  ngOnInit() {}
}
