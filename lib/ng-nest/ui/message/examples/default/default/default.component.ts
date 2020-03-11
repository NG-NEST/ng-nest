import { Component } from '@angular/core';
import { XMessageService } from '@ng-nest/ui/message';
import { XPlace } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  constructor(private message: XMessageService) {}
  open(place: XPlace, label: string) {
    this.message.info({ label: `${label} 消息`, placement: place });
  }
}
