import { Component } from '@angular/core';
import { XMessageBoxService, XMessageBoxAction } from '@ng-nest/ui/message-box';
import { XMessageService } from '@ng-nest/ui/message';

@Component({
  selector: 'ex-validator',
  templateUrl: './validator.component.html'
})
export class ExValidatorComponent {
  constructor(private msgBox: XMessageBoxService, private message: XMessageService) {}
  prompt() {
    const msgBox = this.msgBox.prompt({
      title: '提交内容',
      content: '请输入邮箱',
      inputValue: 'ngnest@163',
      beforeClose: (action: XMessageBoxAction, msg) => {
        if (action === 'confirm') {
          msgBox.close();
        } else {
          this.message.warning(`邮箱格式不正确:${msg}`);
        }
      },
      callback: (action: XMessageBoxAction, msg) => {
        if (action === 'confirm') {
          // 业务处理......
          this.message.success('邮箱：' + msg);
        } else if (action === 'close') {
          this.message.info('已关闭窗口！');
        } else if (action === 'cancel') {
          this.message.info('已取消窗口！');
        }
      }
    });
  }
}
