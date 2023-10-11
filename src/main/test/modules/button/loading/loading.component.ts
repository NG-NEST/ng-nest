import { Component } from '@angular/core';

@Component({
  selector: 'ex-loading',
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
    }, 2000);
  }
}
