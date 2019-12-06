import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ex-clear",
  templateUrl: "./clear.component.html",
  styleUrls: ["./clear.component.scss"]
})
export class ExClearComponent implements OnInit {
  model = "清除数据";
  constructor() {}

  ngOnInit() {}
}
