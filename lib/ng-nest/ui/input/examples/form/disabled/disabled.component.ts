import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ex-disabled",
  templateUrl: "./disabled.component.html",
  styleUrls: ["./disabled.component.scss"]
})
export class ExDisabledComponent implements OnInit {
  model = "输入框禁用";
  modelClearable = "禁用状态下，不显示清除按钮";
  constructor() {}

  ngOnInit() {}
}
