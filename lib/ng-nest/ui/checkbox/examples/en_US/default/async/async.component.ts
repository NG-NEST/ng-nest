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
  model = ['DingTalk'];
  loading = false;
  getData() {
    this.loading = true;
    this.data = new Observable((x) => {
      // Instead of an HTTP request, or data is directly defined as an Observable object
      setTimeout(() => {
        this.model = ['Weibo'];
        this.loading = false;
        x.next(['QQ', 'WeChat', 'DingTalk', 'Weibo']);
        x.complete();
      }, 2000);
    });
  }
}
