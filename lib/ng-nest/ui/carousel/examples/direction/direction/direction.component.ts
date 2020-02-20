import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ex-direction",
  templateUrl: "./direction.component.html",
  styleUrls: ["./direction.component.scss"]
})
export class ExDirectionComponent implements OnInit {
  list = [1, 2, 3, 4, 5];
  constructor() {}

  ngOnInit() {}
}
