import { Component } from '@angular/core';
import { XIsEmpty } from '@ng-nest/ui/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'ex-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class ExSearchComponent {
  default = ['AAAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE', 'FFFF', 'GGGG', 'HHHH', 'IIII', 'JJJJ', 'KKKK', 'LLLL', 'MMMM', 'NNNN', 'VVVV'];

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
  modelMultipleMoreTpl = ['AAAA', 'BBBB', 'CCCC'];

  change(_event: any) {
    console.log(_event);
  }
}
