import { Component } from '@angular/core';
import { XMessageBoxService } from '@ng-nest/ui/message-box';
import { delay, of } from 'rxjs';

@Component({
  selector: 'ex-loading',
  templateUrl: './loading.component.html'
})
export class ExLoadingComponent {
  constructor(private msgBox: XMessageBoxService) {}
  confirm() {
    this.msgBox.confirm({
      title: '提示',
      content: '此操作将永久删除此条数据, 是否继续？',
      type: 'warning',
      confirmLoading: () => of(false).pipe(delay(2000))
    });
  }
}
