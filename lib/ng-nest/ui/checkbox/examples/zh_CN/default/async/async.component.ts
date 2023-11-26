import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XCheckboxComponent } from '@ng-nest/ui/checkbox';
import { Observable } from 'rxjs';

@Component({
  selector: 'ex-async',
  standalone: true,
  imports: [FormsModule, XCheckboxComponent, XButtonComponent],
  templateUrl: './async.component.html',
  styleUrls: ['./async.component.scss']
})
export class ExAsyncComponent {
  data!: Observable<string[]>;
  model = ['钉钉'];
  loading = false;
  getData() {
    this.loading = true;
    this.data = new Observable((x) => {
      // 替换成http请求，或者data直接定义成 Observable 对象
      setTimeout(() => {
        this.model = ['微博'];
        this.loading = false;
        x.next(['QQ', '微信', '钉钉', '微博']);
        x.complete();
      }, 2000);
    });
  }
}
