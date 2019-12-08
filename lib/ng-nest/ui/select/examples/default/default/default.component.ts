import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ex-default",
  templateUrl: "./default.component.html",
  styleUrls: ["./default.component.scss"]
})
export class ExDefaultComponent implements OnInit {
  data = [
    { key: 1, label: "QQ" },
    { key: 2, label: "微信" },
    { key: 3, label: "钉钉" },
    { key: 4, label: "微博" }
  ];
  data2 = [
    { key: 1, label: "AA" },
    { key: 2, label: "BB" },
    { key: 3, label: "CC" },
    { key: 4, label: "DD" },
    { key: 5, label: "EE" },
    { key: 6, label: "FF" },
    { key: 7, label: "GG" },
    { key: 8, label: "HH" },
    { key: 9, label: "II" },
    { key: 10, label: "JJ" }
  ];
  model = 2;
  constructor() {}

  ngOnInit() {}
}
