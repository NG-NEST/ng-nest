import { Component } from '@angular/core';
import { XMessageRef, XMessageService } from '@ng-nest/ui/message';
import { XPlace } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  messageRef?: XMessageRef;
  constructor(private message: XMessageService) {}
  open(place: XPlace, title: string) {
    if (this.messageRef?.opened()) {
      return;
    }
    this.messageRef = this.message.info({ title: title + '消息', placement: place, displayType: 'single' });
  }
}
