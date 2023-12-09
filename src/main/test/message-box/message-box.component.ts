import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExConfirmComponent,
  ExCustomComponent,
  ExPromptComponent
} from '@ng-nest/ui/message-box/examples';

@Component({
  selector: 'te-message-box',
  standalone: true,
  imports: [ExDefaultComponent, ExConfirmComponent, ExCustomComponent, ExPromptComponent],
  templateUrl: './message-box.component.html'
})
export class TeMessageBoxComponent {}
