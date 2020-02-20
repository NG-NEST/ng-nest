import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ex-arrow",
  templateUrl: "./arrow.component.html",
  styleUrls: ["./arrow.component.scss"]
})
export class ExArrowComponent implements OnInit {
  list = [1, 2, 3, 4, 5];
  constructor() {}

  ngOnInit() {}
}
