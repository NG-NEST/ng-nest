import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XSelectComponent } from '@ng-nest/ui/select';
import { Observable } from 'rxjs';

@Component({
  selector: 'ex-async',
  standalone: true,
  imports: [FormsModule, XSelectComponent],
  templateUrl: './async.component.html',
  styleUrls: ['./async.component.scss']
})
export class ExAsyncComponent {
  model = 'BBBB';
  data = new Observable<string[]>((x) => {
    // 替换成http请求，或者data直接定义成 Observable 对象
    setTimeout(() => {
      this.model = 'CCCC';
      x.next(['AAAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE', 'FFFF', 'GGGG', 'HHHH', 'IIII', 'JJJJ']);
      x.complete();
    }, 2000);
  });
}
