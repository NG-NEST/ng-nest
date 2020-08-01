import { Component } from '@angular/core';
import { XMessageBoxService, XMessageBoxAction } from '@ng-nest/ui/message-box';
import { XMessageService } from '@ng-nest/ui/message';

@Component({
  selector: 'ex-prompt',
  templateUrl: './prompt.component.html'
})
export class ExPromptComponent {
  constructor(private msgBox: XMessageBoxService, private message: XMessageService) {}
  prompt() {
    this.msgBox.prompt({
      title: 'Submit content',
      content: 'Please enter email',
      inputValue: 'ngnest@163',
      inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
      inputInvalidMessage: 'Incorrect email format',
      callback: (action: XMessageBoxAction, msg) => {
        if (action === 'confirm') {
          // Business processing......
          this.message.success('email：' + msg);
        } else {
          this.message.info('Submission has been cancelled!');
        }
      }
    });
  }
}
