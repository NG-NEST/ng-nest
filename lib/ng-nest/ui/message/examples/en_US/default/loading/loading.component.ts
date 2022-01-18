import { Component } from '@angular/core';
import { XMessageService } from '@ng-nest/ui/message';

@Component({
  selector: 'ex-loading',
  templateUrl: './loading.component.html'
})
export class ExLoadingComponent {
  constructor(private message: XMessageService) {}
  loading() {
    const ld = this.message.loading('loading');
    setTimeout(() => {
      ld.currentClose();
    }, 3000);
  }

  loadingSuccess() {
    const ld = this.message.loading('loading');
    setTimeout(() => {
      ld.currentUpdate({ type: 'success', title: 'loaded!', duration: 2000 });
    }, 3000);
  }
}
