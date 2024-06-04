import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XIsEmpty } from '@ng-nest/ui/core';
import { XSelectComponent } from '@ng-nest/ui/select';
import { Observable } from 'rxjs';

@Component({
  selector: 'ex-search',
  standalone: true,
  imports: [FormsModule, XSelectComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class ExSearchComponent {
  default = signal([
    'AAAA',
    'BBBB',
    'CCCC',
    'DDDD',
    'EEEE',
    'FFFF',
    'GGGG',
    'HHHH',
    'IIII',
    'JJJJ',
    'KKKK',
    'LLLL',
    'MMMM',
    'NNNN',
    'VVVV'
  ]);

  data = signal([...this.default()]);
  model = signal('');

  dataAsync = signal(
    (str: string) =>
      new Observable<string[]>((x) => {
        setTimeout(() => {
          if (XIsEmpty(str)) {
            x.next([...this.default()]);
          } else {
            x.next([...this.default().filter((x) => x.indexOf(str) >= 0)!]);
          }
          x.complete();
        }, 1000);
      })
  );
  modelAsync = signal('');

  modelMultipleAsync = signal([]);

  dataMultiple = signal([...this.default()]);
  modelMultiple = signal([]);

  dataMultipleMore = signal([...this.default()]);
  modelMultipleMore = signal([]);

  dataMultipleMoreTpl = signal([...this.default()]);
  modelMultipleMoreTpl = signal(['AAAA', 'BBBB', 'CCCC']);

  change(_event: any) {
    console.log(_event);
  }
}
