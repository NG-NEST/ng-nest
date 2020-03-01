import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ex-close",
  templateUrl: "./close.component.html",
  styleUrls: ["./close.component.scss"]
})
export class ExCloseComponent implements OnInit {
  tags = ["标签一", "标签二", "标签三", "标签四", "标签五"];
  constructor() {}

  ngOnInit() {}

  close(tag) {
    this.tags.splice(this.tags.indexOf(tag), 1);
  }
}
