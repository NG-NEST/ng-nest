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
  model = signal(['钉钉']);
  loading = signal(false);
  getData() {
    this.loading.set(true);
    this.data.set(
      new Observable((x) => {
        // 替换成http请求，或者data直接定义成 Observable 对象
        setTimeout(() => {
          this.model.set(['微博']);
          this.loading.set(false);
          x.next(['QQ', '微信', '钉钉', '微博']);
          x.complete();
        }, 2000);
      })
    );
  }
}
