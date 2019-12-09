import { Component, OnInit } from "@angular/core";
import { XData } from "@ng-nest/ui/core";
import { XSelectNode } from "@ng-nest/ui/select";
import { Observable } from "rxjs";

@Component({
  selector: "ex-async",
  templateUrl: "./async.component.html",
  styleUrls: ["./async.component.scss"]
})
export class ExAsyncComponent implements OnInit {
  model: any;
  data: XData<XSelectNode[]> = Observable.create(x => {
    // 替换成http请求，或者data直接定义成 Observable 对象
    setTimeout(() => {
      x.next([
        { key: 1, label: "QQ" },
        { key: 2, label: "微信" },
        { key: 3, label: "钉钉" },
        { key: 4, label: "微博" }
      ]);
      x.complete();
    }, 2000);
  });
  constructor() {}

  ngOnInit() {}
}
