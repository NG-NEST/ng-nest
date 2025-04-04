import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XSwitchComponent } from '@ng-nest/ui/switch';
import { of } from 'rxjs/internal/observable/of';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'ex-loading',
  imports: [FormsModule, XSwitchComponent],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class ExLoadingComponent {
  model = signal(false);
  loading = signal(false);

  onClick() {
    if (this.loading()) return;
    this.loading.set(true);
    of(true)
      .pipe(delay(2000))
      .subscribe(() => {
        this.model.update((x) => !x);
        this.loading.set(false);
      });
  }
}
