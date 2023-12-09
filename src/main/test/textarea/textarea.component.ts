import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExClearComponent,
  ExDisabledComponent,
  ExIconComponent,
  ExLabelComponent,
  ExLengthComponent,
  ExRequiredComponent
} from '@ng-nest/ui/textarea/examples';

@Component({
  selector: 'te-textarea',
  standalone: true,
  imports: [
    ExDefaultComponent,
    ExClearComponent,
    ExDisabledComponent,
    ExIconComponent,
    ExLabelComponent,
    ExLengthComponent,
    ExRequiredComponent
  ],
  templateUrl: './textarea.component.html'
})
export class TeTextareaComponent {}
