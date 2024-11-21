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
  // Matching
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
        // Replace HTTP request
        setTimeout(() => {
          x.next([`${str}`, `${str}${str}`, `${str}${str}${str}`]);
          x.complete();
        }, 500);
      })
  );

  // Fixed option match
  modelArray = signal('');
  dataArray = signal(['aaaa', 'bbbb', 'cccc', 'dddd', 'aaa', 'bbb', 'ccc', 'ddd']);

  // Fixed options match, request once
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
