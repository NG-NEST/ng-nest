import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XSelectComponent } from '@ng-nest/ui/select';
import { Observable } from 'rxjs';

@Component({
  selector: 'ex-async',
  imports: [FormsModule, XSelectComponent],
  templateUrl: './async.component.html',
  styleUrls: ['./async.component.scss']
})
export class ExAsyncComponent {
  model = signal('BBBB');
  data = signal(
    new Observable<string[]>((x) => {
      // 替换成http请求，或者data直接定义成 Observable 对象
      setTimeout(() => {
        this.model.set('CCCC');
        x.next(['AAAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE', 'FFFF', 'GGGG', 'HHHH', 'IIII', 'JJJJ']);
        x.complete();
      }, 2000);
    })
  );
}
