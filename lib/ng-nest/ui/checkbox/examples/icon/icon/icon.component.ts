import { Component, OnInit } from "@angular/core";
import { XCheckboxNode } from "@ng-nest/ui/checkbox";

@Component({
  selector: "ex-icon",
  templateUrl: "./icon.component.html",
  styleUrls: ["./icon.component.scss"]
})
export class ExIconComponent implements OnInit {
  data: XCheckboxNode[] = [
    { key: 1, title: "QQ", icon: "ado-qq" },
    { key: 2, title: "微信", icon: "ado-wechat" },
    { key: 3, title: "钉钉", icon: "ado-dingding" },
    { key: 4, title: "微博", icon: "ado-weibo" }
  ];
  dataDisabled: XCheckboxNode[] = this.data.map((x, i) => {
    let clone = Object.assign({}, x);
    if (i === 1) clone.disabled = true;
    return clone;
  });
  model = [2];
  constructor() {}

  ngOnInit() {}
}
