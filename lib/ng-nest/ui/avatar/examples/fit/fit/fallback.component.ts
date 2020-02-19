import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ex-fallback",
  templateUrl: "./fallback.component.html",
  styleUrls: ["./fallback.component.scss"]
})
export class ExFallbackComponent implements OnInit {
  src = "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg";
  constructor() {}

  ngOnInit() {}
}
