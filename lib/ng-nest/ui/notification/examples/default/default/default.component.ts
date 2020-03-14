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
      title: title+ '消息',
      content: '天将降大任于斯人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为也，所以动心忍性，增益其所不能。',
      placement: place
    });
  }
}
