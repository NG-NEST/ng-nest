import { Component, ViewChild, TemplateRef } from '@angular/core';
import { XMessageBoxService, XMessageBoxAction } from '@ng-nest/ui/message-box';
import { XMessageService } from '@ng-nest/ui/message';
import { XButtonComponent } from '@ng-nest/ui/button';

@Component({
  selector: 'ex-custom',
  standalone: true,
  imports: [XButtonComponent],
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class ExCustomComponent {
  @ViewChild('contentTpl', { static: true }) contentTpl!: TemplateRef<void>;
  constructor(private msgBox: XMessageBoxService, private message: XMessageService) {}
  alertCustom() {
    this.msgBox.alert({
      title: 'Custom content',
      content: this.contentTpl,
      backdropClose: true,
      callback: (action: XMessageBoxAction) => this.message.info('action: ' + action)
    });
  }
}
