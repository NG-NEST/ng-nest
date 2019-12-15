import { Component, OnInit } from "@angular/core";
import { XListNode } from "@ng-nest/ui/list";
import { XData } from "@ng-nest/ui/core";

@Component({
  selector: "ex-default",
  templateUrl: "./default.component.html",
  styleUrls: ["./default.component.scss"]
})
export class ExDefaultComponent implements OnInit {
  data = ["AAAA", "BBBB", { label: "CCCC", hasChild: true }, "DDDD"];
  data1 = JSON.parse(JSON.stringify(this.data));
  data2 = JSON.parse(JSON.stringify(this.data));
  data3 = JSON.parse(JSON.stringify(this.data));
  data4 = JSON.parse(JSON.stringify(this.data));
  data5 = JSON.parse(JSON.stringify(this.data));
  data6 = JSON.parse(JSON.stringify(this.data));
  model1: any;
  model2 = "AAAA";
  model3: any;
  model4 = ["AAAA", "BBBB"];
  model5: any;
  model6 = ["BBBB", "CCCC"];
  constructor() {}

  ngOnInit() {}
}
