import { Component, signal } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XNotificationService } from '@ng-nest/ui/notification';

@Component({
  selector: 'ex-type',
  standalone: true,
  imports: [XButtonComponent],
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class ExTypeComponent {
  content = signal(`The more you learn, the more you don't know.`);
  constructor(public notification: XNotificationService) {}
}
