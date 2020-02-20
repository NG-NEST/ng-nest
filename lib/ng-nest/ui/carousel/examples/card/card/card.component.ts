import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ex-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"]
})
export class ExCardComponent implements OnInit {
  list = [1, 2, 3, 4, 5];
  constructor() {}

  ngOnInit() {}
}
