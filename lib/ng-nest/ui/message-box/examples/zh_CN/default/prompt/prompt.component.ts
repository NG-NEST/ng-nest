import { Component } from '@angular/core';
import { XMessageBoxService, XMessageBoxAction } from '@ng-nest/ui/message-box';
import { XMessageService } from '@ng-nest/ui/message';
import { CommonModule } from '@angular/common';
import { XButtonComponent } from '@ng-nest/ui/button';

@Component({
  selector: 'ex-prompt',
  standalone: true,
  imports: [CommonModule, XButtonComponent],
  templateUrl: './prompt.component.html'
})
export class ExPromptComponent {
  constructor(private msgBox: XMessageBoxService, private message: XMessageService) {}
  prompt1() {
    this.msgBox.prompt({
      title: '提交内容',
      content: '请输入邮箱',
      inputValue: 'ngnest@163',
      inputPattern:
        /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
      inputInvalidMessage: '邮箱格式不正确',
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
  prompt2() {
    this.msgBox.prompt({
      title: '提交内容',
      content: '请输入邮箱',
      inputValue: 'ngnest@163',
      inputValidator: (value: string) => {
        let reg = new RegExp(
          /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
        );
        return reg.test(value);
      },
      inputInvalidMessage: '邮箱格式不正确',
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
