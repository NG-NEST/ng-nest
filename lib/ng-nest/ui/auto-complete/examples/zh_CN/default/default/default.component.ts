import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XAutoCompleteComponent } from '@ng-nest/ui/auto-complete';
import { XColComponent, XRowComponent } from '@ng-nest/ui/layout';
import { Observable } from 'rxjs';

@Component({
  selector: 'ex-default',
  imports: [FormsModule, XRowComponent, XColComponent, XAutoCompleteComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  // 传参手动匹配
  model = signal('');
  data = signal(
    (str: string) =>
      new Observable<string[]>((x) => {
        x.next([`${str}`, `${str}${str}`, `${str}${str}${str}`]);
        x.complete();
      })
  );
  modelAsync = signal('ngnest');
  dataAsync = signal(
    (str: string) =>
      new Observable<string[]>((x) => {
        // 替换成http请求
        setTimeout(() => {
          x.next([`${str}`, `${str}${str}`, `${str}${str}${str}`]);
          x.complete();
        }, 500);
      })
  );

  // 固定选项匹配
  modelArray = signal('');
  dataArray = signal(['aaaa', 'bbbb', 'cccc', 'dddd', 'aaa', 'bbb', 'ccc', 'ddd']);

  // 固定选项匹配，请求一次
  modelObservable = signal('aaa');
  dataObservable = signal(
    new Observable<string[]>((x) => {
      setTimeout(() => {
        x.next(['aaaa', 'bbbb', 'cccc', 'dddd', 'aaa', 'bbb', 'ccc', 'ddd']);
        x.complete();
      }, 500);
    })
  );
}
