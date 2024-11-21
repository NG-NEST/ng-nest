import { Component, TemplateRef, viewChild } from '@angular/core';
import { XMessageBoxService, XMessageBoxAction } from '@ng-nest/ui/message-box';
import { XMessageService } from '@ng-nest/ui/message';
import { XButtonComponent } from '@ng-nest/ui/button';

@Component({
  selector: 'ex-custom',
  imports: [XButtonComponent],
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class ExCustomComponent {
  contentTpl = viewChild.required<TemplateRef<void>>('contentTpl');
  constructor(
    private msgBox: XMessageBoxService,
    private message: XMessageService
  ) {}
  alertCustom() {
    this.msgBox.alert({
      title: '自定义内容',
      content: this.contentTpl(),
      backdropClose: true,
      callback: (action: XMessageBoxAction) => this.message.info('action: ' + action)
    });
  }
}
