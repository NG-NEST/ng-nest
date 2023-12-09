import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XSwitchComponent } from '@ng-nest/ui/switch';
import { of } from 'rxjs/internal/observable/of';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'ex-loading',
  standalone: true,
  imports: [FormsModule, XSwitchComponent],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class ExLoadingComponent {
  model = false;
  loading = false;

  onClick() {
    if (this.loading) return;
    this.loading = true;
    of(true)
      .pipe(delay(2000))
      .subscribe(() => {
        this.model = !this.model;
        this.loading = false;
      });
  }
}
