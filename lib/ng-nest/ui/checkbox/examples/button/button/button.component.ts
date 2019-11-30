import { Component, OnInit } from "@angular/core";
import { XCheckboxNode } from "@ng-nest/ui/checkbox";

@Component({
  selector: "ex-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"]
})
export class ExButtonComponent implements OnInit {
  data: XCheckboxNode[] = [
    { key: 1, label: "QQ" },
    { key: 2, label: "微信" },
    { key: 3, label: "钉钉" },
    { key: 4, label: "微博" }
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
