import { Component, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { XCoversationsComponent } from '@ng-nest/ui/coversations';

@Component({
  selector: 'ex-load-more',
  imports: [XCoversationsComponent],
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
