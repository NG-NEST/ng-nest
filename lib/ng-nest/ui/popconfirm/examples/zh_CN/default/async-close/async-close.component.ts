import { Component, signal } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XPopconfirmComponent } from '@ng-nest/ui/popconfirm';
import { Observable } from 'rxjs';

@Component({
  selector: 'ex-async-close',
  imports: [XPopconfirmComponent, XButtonComponent],
  templateUrl: './async-close.component.html'
})
export class ExAsyncCloseComponent {
  confirmAsync = signal(
    new Observable<void>((x) => {
      setTimeout(() => {
        x.next();
      }, 2000);
    })
  );
  cancel() {
    console.log('cancel');
  }
}
