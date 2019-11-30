import { Component, OnInit } from "@angular/core";
import { XCheckboxNode } from "@ng-nest/ui/checkbox";
import { XData } from "@ng-nest/ui/core";
import { Observable } from "rxjs";

@Component({
  selector: "ex-async",
  templateUrl: "./async.component.html",
  styleUrls: ["./async.component.scss"]
})
export class ExAsyncComponent implements OnInit {
  data: XData<XCheckboxNode[]>;
  model = [2];
  loading = false;
  getData() {
    this.loading = true;
    this.data = Observable.create(x => {
      // 替换成http请求，或者data直接定义成 Observable 对象
      setTimeout(() => {
        this.model = [3];
        this.loading = false;
        x.next([
          { key: 1, label: "QQ" },
          { key: 2, label: "微信" },
          { key: 3, label: "钉钉" },
          { key: 4, label: "微博" }
        ]);
        x.complete();
      }, 2000);
    });
  }
  constructor() {}

  ngOnInit() {}
}
