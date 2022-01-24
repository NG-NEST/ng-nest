import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'ex-async-close',
  templateUrl: './async-close.component.html'
})
export class ExAsyncCloseComponent {
  confirmAsync = new Observable<void>((x) => {
    setTimeout(() => {
      x.next();
    }, 2000);
  });
  cancel() {}
}
