import { Component } from '@angular/core';
import { XMessageBoxService, XMessageBoxAction } from '@ng-nest/ui/message-box';
import { XMessageService } from '@ng-nest/ui/message';
import { XButtonComponent } from '@ng-nest/ui/button';

@Component({
  selector: 'ex-prompt',
  standalone: true,
  imports: [XButtonComponent],
  templateUrl: './prompt.component.html'
})
export class ExPromptComponent {
  constructor(private msgBox: XMessageBoxService, private message: XMessageService) {}
  prompt1() {
    this.msgBox.prompt({
      title: 'Submit content',
      content: 'Please enter email',
      inputValue: 'ngnest@163',
      inputPattern:
        /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
      inputInvalidMessage: 'Incorrect email format',
      callback: (action: XMessageBoxAction, msg) => {
        if (action === 'confirm') {
          // Business processing......
          this.message.success('email：' + msg);
        } else if (action === 'close') {
          this.message.info('Submission has been closed.');
        } else if (action === 'cancel') {
          this.message.info('Submission has been canceled.');
        }
      }
    });
  }
  prompt2() {
    this.msgBox.prompt({
      title: 'Submit content',
      content: 'Please enter email',
      inputValue: 'ngnest@163',
      inputValidator: (value: string) => {
        let reg = new RegExp(
          /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
        );
        return reg.test(value);
      },
      inputInvalidMessage: 'Incorrect email format',
      callback: (action: XMessageBoxAction, msg) => {
        if (action === 'confirm') {
          // Business processing......
          this.message.success('email：' + msg);
        } else if (action === 'close') {
          this.message.info('Submission has been closed.');
        } else if (action === 'cancel') {
          this.message.info('Submission has been canceled.');
        }
      }
    });
  }
}
