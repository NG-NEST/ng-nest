import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ex-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class ExHeaderComponent implements OnInit {
  list = [1, 2, 3, 4, 5, 6];
  constructor() {}

  ngOnInit() {}
}
