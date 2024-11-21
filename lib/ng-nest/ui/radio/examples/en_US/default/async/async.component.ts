import { Component, signal } from '@angular/core';
import { XRadioComponent } from '@ng-nest/ui/radio';
import { Observable, of } from 'rxjs';
import { XButtonComponent } from '@ng-nest/ui/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ex-async',
  imports: [FormsModule, XButtonComponent, XRadioComponent],
  templateUrl: './async.component.html',
  styleUrls: ['./async.component.scss']
})
export class ExAsyncComponent {
  data = signal<Observable<string[]>>(of([]));
  model = signal('QQ');
  loading = signal(false);
  getData() {
    this.loading.set(true);
    this.data.set(
      new Observable((x) => {
        // Replace with http request, or directly define data as Observable object
        setTimeout(() => {
          this.model.set('WeChat');
          this.loading.set(false);
          x.next(['QQ', 'WeChat', 'DingTalk', 'Weibo']);
          x.complete();
        }, 2000);
      })
    );
  }
}
