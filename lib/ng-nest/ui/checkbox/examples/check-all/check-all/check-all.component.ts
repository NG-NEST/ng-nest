import { Component, OnInit } from "@angular/core";
import { XCheckboxNode } from "@ng-nest/ui/checkbox";
import { XData } from "@ng-nest/ui/core";

@Component({
  selector: "ex-check-all",
  templateUrl: "./check-all.component.html",
  styleUrls: ["./check-all.component.scss"]
})
export class ExCheckAllComponent implements OnInit {
  checkAllData: XData<XCheckboxNode[]> = [{ key: true, label: "全选" }];
  checkAll = [false];
  indeterminate = true;
  data: XCheckboxNode[] = [
    { key: 1, label: "QQ" },
    { key: 2, label: "微信" },
    { key: 3, label: "钉钉" },
    { key: 4, label: "微博" }
  ];
  model: any = [1, 2];

  constructor() {}

  ngOnInit() {}

  checkAllChange(value) {
    this.model = value.indexOf(true) >= 0 ? this.data.map(x => x.key) : [];
    this.indeterminate = false;
  }
  itemChange(value) {
    this.checkAll = [value.length === this.data.length];
    this.indeterminate = value.length > 0 && value.length < this.data.length;
  }
}
