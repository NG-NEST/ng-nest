import { Component } from '@angular/core';
import { XMessageBoxService, XMessageBoxAction } from '@ng-nest/ui/message-box';
import { XMessageService } from '@ng-nest/ui/message';
import { XPlace } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  constructor(private msgBox: XMessageBoxService, private message: XMessageService) {}
  alert(place: XPlace, title: string) {
    this.msgBox.alert({
      title: '弹框 ' + title,
      content: '这是一段内容',
      placement: place,
      callback: (action: XMessageBoxAction) => this.message.info('action: ' + action)
    });
  }
}
