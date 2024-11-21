import { Component, signal } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';

@Component({
  selector: 'ex-loading',
  imports: [XButtonComponent],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class ExLoadingComponent {
  loading = signal(false);

  save() {
    if (this.loading()) return;
    this.loading.set(true);
    setTimeout(() => {
      this.loading.set(false);
    }, 3000);
  }
}
