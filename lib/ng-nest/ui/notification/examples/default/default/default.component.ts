import { Component } from '@angular/core';
import { XCorner } from '@ng-nest/ui/core';
import { XNotificationService } from '@ng-nest/ui/notification';

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  constructor(private notification: XNotificationService) {}
  open(place: XCorner, title: string) {
    this.notification.info({
      title: `${title} 消息`,
      content: '这个是内容信息这个是内容信息这个是内容信息这个是内容信息这个是内容信息这个是内容信息',
      placement: place
    });
  }
}
