import { Component, signal } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'ex-full-screen',
  imports: [XLoadingComponent, XButtonComponent],
  templateUrl: './full-screen.component.html'
})
export class ExFullScreenComponent {
  loading = signal(false);
  onLoading() {
    this.loading.set(true);
    of(true)
      .pipe(delay(2000))
      .subscribe(() => {
        this.loading.set(false);
      });
  }
}
