import { Component } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'ex-fullScreen',
  templateUrl: './fullScreen.component.html'
})
export class ExFullScreenComponent {
  loading = false;
  onLoading() {
    this.loading = true;
    of(true)
      .pipe(delay(2000))
      .subscribe(x => {
        this.loading = false;
      });
  }
}
