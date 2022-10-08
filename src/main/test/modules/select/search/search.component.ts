import { Component } from '@angular/core';
import { XIsEmpty } from '@ng-nest/ui/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'ex-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class ExSearchComponent {
  default = [
    '水果',
    '蔬菜',
    '饮料',
    '苹果',
    '香蕉',
    '梨子',
    '生菜',
    '大白菜',
    '韭菜',
    '汽水',
    '果汁',
    '纯净水',
    '小米蕉',
    '仙人蕉',
    '皇帝蕉'
  ];

  data = [...this.default];
  model = '';

  dataAsync = (str: string) =>
    new Observable<string[]>((x) => {
      setTimeout(() => {
        if (XIsEmpty(str)) {
          x.next([...this.default]);
        } else {
          x.next([...this.default.filter((x) => x.indexOf(str) >= 0)!]);
        }
        x.complete();
      }, 1000);
    });
  modelAsync = '';

  modelMultipleAsync = [];

  dataMultiple = [...this.default];
  modelMultiple = [];

  dataMultipleMore = [...this.default];
  modelMultipleMore = [];

  dataMultipleMoreTpl = [...this.default];
  modelMultipleMoreTpl = ['苹果', '纯净水', '仙人蕉'];

  change(_event: any) {
    console.log(_event);
  }
}
