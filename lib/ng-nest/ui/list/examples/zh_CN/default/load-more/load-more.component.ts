import { Component, signal } from '@angular/core';
import { XListComponent } from '@ng-nest/ui/list';
import { Observable } from 'rxjs';

@Component({
  selector: 'ex-load-more',
  standalone: true,
  imports: [XListComponent],
  templateUrl: './load-more.component.html',
  styleUrls: ['./load-more.component.scss']
})
export class ExLoadMoreComponent {
  list = signal(['AA', 'BB', 'CC', 'DD', 'EE', 'FF', 'GG', 'HH']);
  data = signal(
    (index: number) =>
      new Observable<string[]>((x) => {
        setTimeout(() => {
          x.next(this.list().map((x) => `${x}-${index}`));
          x.complete();
        }, 500);
      })
  );
}
