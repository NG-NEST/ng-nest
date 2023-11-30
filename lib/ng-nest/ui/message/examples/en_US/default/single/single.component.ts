import { Component } from '@angular/core';
import { XMessageService } from '@ng-nest/ui/message';
import { XPlace } from '@ng-nest/ui/core';
import { CommonModule } from '@angular/common';
import { XButtonComponent } from '@ng-nest/ui/button';

@Component({
  selector: 'ex-single',
  standalone: true,
  imports: [CommonModule, XButtonComponent],
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class ExSingleComponent {
  i = 1;
  constructor(private message: XMessageService) {}
  open(place: XPlace, title: string) {
    this.i++;
    this.message.info({ title: this.i + title + 'single', placement: place, displayType: 'single' });
  }
}
