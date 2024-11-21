import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExConfirmComponent,
  ExCustomComponent,
  ExPromptComponent,
  ExTextareaComponent
} from '@ng-nest/ui/message-box/examples';

@Component({
  selector: 'te-message-box',
  imports: [ExDefaultComponent, ExConfirmComponent, ExCustomComponent, ExPromptComponent, ExTextareaComponent],
  templateUrl: './message-box.component.html'
})
export class TeMessageBoxComponent {}
