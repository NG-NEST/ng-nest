import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ex-line-height",
  templateUrl: "./line-height.component.html",
  styleUrls: ["./line-height.component.scss"]
})
export class ExLineHeightComponent implements OnInit {
  text = "天将降大任于斯人也，<br/>必先苦其心志，劳其筋骨<br/>，饿其体肤";
  constructor() {}

  ngOnInit() {}
}
