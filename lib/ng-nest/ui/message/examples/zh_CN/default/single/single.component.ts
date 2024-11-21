import { Component, signal } from '@angular/core';
import { XMessageService } from '@ng-nest/ui/message';
import { XPlace } from '@ng-nest/ui/core';
import { XButtonComponent } from '@ng-nest/ui/button';

@Component({
  selector: 'ex-single',
  imports: [XButtonComponent],
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class ExSingleComponent {
  i = signal(1);
  constructor(private message: XMessageService) {}
  open(place: XPlace, title: string) {
    this.i.update((x) => ++x);
    this.message.info({ title: this.i() + title + '消息', placement: place, displayType: 'single' });
  }
}
