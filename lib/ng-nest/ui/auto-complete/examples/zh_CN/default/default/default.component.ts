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
  data = (str: string) =>
    new Observable<string[]>((x) => {
      x.next([`${str}`, `${str}${str}`, `${str}${str}${str}`]);
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
  modelArray = '';
  dataArray = ['aaaa', 'bbbb', 'cccc', 'dddd', 'aaa', 'bbb', 'ccc', 'ddd'];

  // 固定选项匹配，请求一次
  modelObservable = 'aaa';
  dataObservable = new Observable<string[]>((x) => {
    setTimeout(() => {
      x.next(['aaaa', 'bbbb', 'cccc', 'dddd', 'aaa', 'bbb', 'ccc', 'ddd']);
      x.complete();
    }, 500);
  });
}
