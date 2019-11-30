import { Component, OnInit } from "@angular/core";
import { XRadioNode } from "@ng-nest/ui/radio";

@Component({
  selector: "ex-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"]
})
export class ExButtonComponent implements OnInit {
  data: XRadioNode[] = [
    { key: 1, label: "QQ" },
    { key: 2, label: "微信" },
    { key: 3, label: "钉钉" },
    { key: 4, label: "微博" }
  ];
  dataDisabled: XRadioNode[] = this.data.map((x, i) => {
    let clone = Object.assign({}, x);
    if (i === 1) clone.disabled = true;
    return clone;
  });
  model = 2;
  constructor() {}

  ngOnInit() {}
}
