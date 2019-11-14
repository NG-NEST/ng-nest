import { Component, OnInit } from "@angular/core";
import { XData } from "@ng-nest/ui/core";
import { XSliderNode } from "@ng-nest/ui/slider";

@Component({
  selector: "ex-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"]
})
export class ExLayoutComponent implements OnInit {
  data: XData<XSliderNode[]> = [
    { key: 1, label: "栅格" },
    { key: 2, label: "代码高亮" },
    { key: 3, label: "SVG图标" },
    { key: 4, label: "滑块" }
  ];
  constructor() {}

  ngOnInit() {}
}
