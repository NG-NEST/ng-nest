import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ex-default",
  templateUrl: "./default.component.html",
  styleUrls: ["./default.component.scss"]
})
export class ExDefaultComponent implements OnInit {
  list = [1, 2, 3, 4, 5];
  constructor() {}

  ngOnInit() {}
}
