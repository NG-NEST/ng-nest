import { Component, OnInit } from "@angular/core";
import { XUploadNode } from "@ng-nest/ui/upload";
import { XData } from "@ng-nest/ui/core";

@Component({
  selector: "ex-default",
  templateUrl: "./default.component.html",
  styleUrls: ["./default.component.scss"]
})
export class ExDefaultComponent implements OnInit {
  data: XData<XUploadNode[]> = ["QQ", "微信", "钉钉", "微博"];
  model = "微信";
  constructor() {}

  ngOnInit() {}
}
