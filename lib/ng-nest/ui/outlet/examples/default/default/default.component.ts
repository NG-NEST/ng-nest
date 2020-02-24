import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ex-default",
  templateUrl: "./default.component.html",
  styleUrls: ["./default.component.scss"]
})
export class ExDefaultComponent implements OnInit {
  label = "字符串";
  constructor() {}

  ngOnInit() {}
}
