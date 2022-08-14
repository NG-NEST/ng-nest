import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'ex-load-more',
  templateUrl: './load-more.component.html',
  styleUrls: ['./load-more.component.scss']
})
export class ExLoadMoreComponent {
  list = ['AA', 'BB', 'CC', 'DD', 'EE', 'FF', 'GG', 'HH'];
  data = (index: number) =>
    new Observable<string[]>((x) => {
      setTimeout(() => {
        x.next(this.list.map((x) => `${x}-${index}`));
        x.complete();
      }, 500);
    });
}
