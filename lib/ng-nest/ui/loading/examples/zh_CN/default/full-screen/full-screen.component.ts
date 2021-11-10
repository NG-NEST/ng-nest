import { Component } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'ex-full-screen',
  templateUrl: './full-screen.component.html'
})
export class ExFullScreenComponent {
  loading = false;
  onLoading() {
    this.loading = true;
    of(true)
      .pipe(delay(2000))
      .subscribe(() => {
        this.loading = false;
      });
  }
}
