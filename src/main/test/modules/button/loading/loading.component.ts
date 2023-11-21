import { Component } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';

@Component({
  selector: 'ex-loading',
  standalone: true,
  imports: [XButtonComponent],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class ExLoadingComponent {
  loading: boolean = false;

  save() {
    if (this.loading) return;
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }
}
