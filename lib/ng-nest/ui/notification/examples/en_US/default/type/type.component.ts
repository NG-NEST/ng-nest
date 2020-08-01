import { Component } from '@angular/core';
import { XNotificationService } from '@ng-nest/ui/notification';

@Component({
  selector: 'ex-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class ExTypeComponent {
  content = `The more you learn, the more you don't know.`;
  constructor(public notification: XNotificationService) {}
}
