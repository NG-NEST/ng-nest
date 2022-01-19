import { Component } from '@angular/core';
import { XMessageService } from '@ng-nest/ui/message';

@Component({
  selector: 'ex-loading',
  templateUrl: './loading.component.html'
})
export class ExLoadingComponent {
  constructor(private message: XMessageService) {}
  loading() {
    const ld = this.message.loading('加载中');
    setTimeout(() => {
      ld.close();
    }, 3000);
  }

  loadingSuccess() {
    const ld = this.message.loading('加载中');
    setTimeout(() => {
      ld.update({ type: 'success', title: '加载完成！', duration: 2000 });
    }, 3000);
  }
}
