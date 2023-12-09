import { Component } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XPopconfirmComponent } from '@ng-nest/ui/popconfirm';
import { Observable } from 'rxjs';

@Component({
  selector: 'ex-async-close',
  standalone: true,
  imports: [XPopconfirmComponent, XButtonComponent],
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
