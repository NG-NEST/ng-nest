import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'ex-async',
  templateUrl: './async.component.html',
  styleUrls: ['./async.component.scss']
})
export class ExAsyncComponent {
  data: Observable<string[]>;
  model = ['DingTalk'];
  loading = false;
  getData() {
    this.loading = true;
    this.data = new Observable((x) => {
      // Instead of an HTTP request, or data is directly defined as an Observable object
      setTimeout(() => {
        this.model = ['Weibo'];
        this.loading = false;
        x.next(['QQ', 'WeChat', 'DingTalk', 'Weibo']);
        x.complete();
      }, 2000);
    });
  }
}
