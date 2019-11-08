import { Component, OnInit } from "@angular/core";
import { NuData } from "@ng-nest/ui/core";
import { NuSliderNode } from "@ng-nest/ui/slider";

@Component({
  selector: "ex-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"]
})
export class ExLayoutComponent implements OnInit {
  data: NuData<NuSliderNode[]> = [
    { nuKey: 1, nuLabel: "栅格" },
    { nuKey: 2, nuLabel: "代码高亮" },
    { nuKey: 3, nuLabel: "SVG图标" },
    { nuKey: 4, nuLabel: "滑块" }
  ];
  constructor() {}

  ngOnInit() {}
}
