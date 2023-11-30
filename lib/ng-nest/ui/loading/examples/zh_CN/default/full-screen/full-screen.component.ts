import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'ex-full-screen',
  standalone: true,
  imports: [CommonModule, XLoadingComponent, XButtonComponent],
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
