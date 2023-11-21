import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XAutoCompleteComponent } from '@ng-nest/ui/auto-complete';
import { XColComponent, XRowComponent } from '@ng-nest/ui/layout';
import { Observable } from 'rxjs';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [FormsModule, XRowComponent, XColComponent, XAutoCompleteComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  // Matching
  model = '';
  data = (str: string) =>
    new Observable<string[]>((x) => {
      x.next([`${str}`, `${str}${str}`, `${str}${str}${str}`]);
      x.complete();
    });
  modelAsync = 'ngnest';
  dataAsync = (str: string) =>
    new Observable<string[]>((x) => {
      // Replace HTTP request
      setTimeout(() => {
        x.next([`${str}`, `${str}${str}`, `${str}${str}${str}`]);
        x.complete();
      }, 500);
    });

  // Fixed option match
  modelArray = '';
  dataArray = ['aaaa', 'bbbb', 'cccc', 'dddd', 'aaa', 'bbb', 'ccc', 'ddd'];

  // Fixed options match, request once
  modelObservable = 'aaa';
  dataObservable = new Observable<string[]>((x) => {
    setTimeout(() => {
      x.next(['aaaa', 'bbbb', 'cccc', 'dddd', 'aaa', 'bbb', 'ccc', 'ddd']);
      x.complete();
    }, 500);
  });
}
