import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XCheckboxComponent } from '@ng-nest/ui/checkbox';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'ex-async',
  imports: [FormsModule, XCheckboxComponent, XButtonComponent],
  templateUrl: './async.component.html',
  styleUrls: ['./async.component.scss']
})
export class ExAsyncComponent {
  data = signal<Observable<string[]>>(of([]));
  model = signal(['DingTalk']);
  loading = signal(false);

  getData() {
    this.loading.set(true);
    this.data.set(
      new Observable((x) => {
        // Instead of an HTTP request, or data is directly defined as an Observable object
        setTimeout(() => {
          this.model.set(['Weibo']);
          this.loading.set(false);
          x.next(['QQ', 'WeChat', 'DingTalk', 'Weibo']);
          x.complete();
        }, 2000);
      })
    );
  }
}
