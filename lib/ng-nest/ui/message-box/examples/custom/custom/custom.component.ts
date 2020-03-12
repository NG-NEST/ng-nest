import { Component, ViewChild, TemplateRef } from '@angular/core';
import { XMessageBoxService, XMessageBoxAction } from '@ng-nest/ui/message-box';
import { XMessageService } from '@ng-nest/ui/message';

@Component({
  selector: 'ex-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class ExPromptComponent {
  @ViewChild('contentTpl', { static: true }) contentTpl: TemplateRef<void>;
  constructor(private msgBox: XMessageBoxService, private message: XMessageService) {}
  alertCustom() {
    this.msgBox.alert({
      title: '自定义内容',
      content: this.contentTpl,
      backdropClose: true,
      callback: (action: XMessageBoxAction) => this.message.info('action: ' + action)
    });
  }
}
