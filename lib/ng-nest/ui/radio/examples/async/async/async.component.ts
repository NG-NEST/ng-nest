import { Component, OnInit } from '@angular/core';
import { XRadioNode } from '@ng-nest/ui/radio';
import { XData } from '@ng-nest/ui/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'ex-async',
  templateUrl: './async.component.html',
  styleUrls: ['./async.component.scss']
})
export class ExAsyncComponent implements OnInit {
  data: XData<XRadioNode[]>;
  model = 'QQ';
  loading = false;
  getData() {
    this.loading = true;
    this.data = Observable.create(x => {
      // 替换成http请求，或者data直接定义成 Observable 对象
      setTimeout(() => {
        this.model = '微信';
        this.loading = false;
        x.next(['QQ', '微信', '钉钉', '微博']);
        x.complete();
      }, 2000);
    });
  }
  constructor() {}

  ngOnInit() {}
}
