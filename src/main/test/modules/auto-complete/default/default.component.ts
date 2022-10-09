import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  // 传参手动匹配
  model = '';
  data = (_str: string) =>
    new Observable<string[]>((x) => {
      console.log('search', _str);
      x.next(['aaaa', 'bbbb', 'cccc', 'dddd', 'AAAA', 'BBBB']);
      x.complete();
    });
  modelAsync = 'ngnest';
  dataAsync = (str: string) =>
    new Observable<string[]>((x) => {
      // 替换成http请求
      setTimeout(() => {
        x.next([`${str}`, `${str}${str}`, `${str}${str}${str}`]);
        x.complete();
      }, 500);
    });

  // 固定选项匹配
  modelArray = 'aaaa';
  dataArray = ['aaaa', 'bbbb', 'cccc', 'dddd', 'AAAA', 'BBBB'];

  // 固定选项匹配，请求一次
  modelObservable = 'aaa';
  dataObservable = new Observable<string[]>((x) => {
    setTimeout(() => {
      x.next(['aaaa', 'bbbb', 'cccc', 'dddd', 'AAAA', 'BBBB']);
      x.complete();
    }, 500);
  });

  getValue() {
    console.log(this.modelArray);
  }
}
