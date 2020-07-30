import { Component } from '@angular/core';
import { XMessageBoxService, XMessageBoxAction } from '@ng-nest/ui/message-box';
import { XMessageService } from '@ng-nest/ui/message';

@Component({
  selector: 'ex-confirm',
  templateUrl: './confirm.component.html'
})
export class ExConfirmComponent {
  constructor(private msgBox: XMessageBoxService, private message: XMessageService) {}
  confirm() {
    this.msgBox.confirm({
      title: '提示',
      content: '此操作将永久删除此条数据, 是否继续？',
      type: 'warning',
      callback: (action: XMessageBoxAction) => {
        if (action === 'confirm') {
          // 业务处理......
          this.message.success('删除成功！');
        } else {
          this.message.info('已取消删除！');
        }
      }
    });
  }
}
