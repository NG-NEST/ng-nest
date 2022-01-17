import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'ex-async-close',
  templateUrl: './async-close.component.html'
})
export class ExAsyncCloseComponent {
  confirm() {
    return new Observable((x) => {
      x.next();
      setTimeout(() => {
        x.complete();
      }, 2000);
    });
  }
  cancel() {}
}
