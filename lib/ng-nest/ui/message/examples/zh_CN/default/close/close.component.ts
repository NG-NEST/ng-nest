import { Component } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XMessageService } from '@ng-nest/ui/message';

@Component({
  selector: 'ex-close',
  imports: [XButtonComponent],
  templateUrl: './close.component.html',
  styleUrls: ['./close.component.scss']
})
export class ExCloseComponent {
  constructor(public message: XMessageService) {}
}
