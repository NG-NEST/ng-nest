import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'ex-async',
  templateUrl: './async.component.html',
  styleUrls: ['./async.component.scss']
})
export class ExAsyncComponent implements OnInit {
  model = 'BBBB';
  data = Observable.create(x => {
    // 替换成http请求，或者data直接定义成 Observable 对象
    setTimeout(() => {
      this.model = 'CCCC';
      x.next(['AAAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE', 'FFFF', 'GGGG', 'HHHH', 'IIII', 'JJJJ']);
      x.complete();
    }, 2000);
  });
  constructor() {}

  ngOnInit() {}
}
