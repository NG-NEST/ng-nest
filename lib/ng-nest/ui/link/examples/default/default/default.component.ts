import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ex-default",
  templateUrl: "./default.component.html",
  styleUrls: ["./default.component.scss"]
})
export class ExDefaultComponent implements OnInit {
  model = 3;
  constructor() {}

  ngOnInit() {}
}
