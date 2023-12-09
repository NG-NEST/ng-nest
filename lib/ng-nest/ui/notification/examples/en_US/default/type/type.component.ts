import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XNotificationService } from '@ng-nest/ui/notification';

@Component({
  selector: 'ex-type',
  standalone: true,
  imports: [CommonModule, XButtonComponent],
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class ExTypeComponent {
  content = `The more you learn, the more you don't know.`;
  constructor(public notification: XNotificationService) {}
}
