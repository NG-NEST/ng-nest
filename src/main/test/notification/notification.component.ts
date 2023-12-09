import { Component } from '@angular/core';
import { ExDefaultComponent, ExTypeComponent } from '@ng-nest/ui/notification/examples';

@Component({
  selector: 'te-notification',
  standalone: true,
  imports: [ExDefaultComponent, ExTypeComponent],
  templateUrl: './notification.component.html'
})
export class TeNotificationComponent {}
