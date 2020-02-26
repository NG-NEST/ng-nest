import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ex-color",
  templateUrl: "./color.component.html",
  styleUrls: ["./color.component.scss"]
})
export class ExColorComponent implements OnInit {
  percent = 10;
  color: "#3f51b5";
  colors = [
    { color: "#f56c6c", percent: 20 },
    { color: "#e6a23c", percent: 40 },
    { color: "#5cb87a", percent: 60 },
    { color: "#1989fa", percent: 80 },
    { color: "#6f7ad3", percent: 100 }
  ];
  constructor() {}

  ngOnInit() {}

  colorFunc(percent) {
    if (percent < 30) {
      return "#909399";
    } else if (percent < 70) {
      return "#e6a23c";
    } else {
      return "#67c23a";
    }
  }
  plus(num) {
    if ((this.percent === 0 && num === -10) || (this.percent === 100 && num === 10)) return;
    this.percent = this.percent + num;
  }
}
