import { Component } from '@angular/core';
import { XMessageService } from '@ng-nest/ui/message';

@Component({
  selector: 'ex-close',
  templateUrl: './close.component.html',
  styleUrls: ['./close.component.scss']
})
export class ExCloseComponent {
  constructor(private message: XMessageService) {}
}
