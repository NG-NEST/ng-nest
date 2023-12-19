import { Component } from '@angular/core';
import { XMessageService } from '@ng-nest/ui/message';
import { XPlace } from '@ng-nest/ui/core';
import { XButtonComponent } from '@ng-nest/ui/button';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [XButtonComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  constructor(private message: XMessageService) {}
  open(place: XPlace, title: string) {
    this.message.info({ title: title + '消息', placement: place });
  }
}
