import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExClearComponent,
  ExDisabledComponent,
  ExIconComponent,
  ExLabelComponent,
  ExLengthComponent,
  ExRequiredComponent,
  ExVariantComponent
} from '@ng-nest/ui/textarea/examples';

@Component({
  selector: 'te-textarea',
  imports: [
    ExDefaultComponent,
    ExClearComponent,
    ExDisabledComponent,
    ExIconComponent,
    ExLabelComponent,
    ExLengthComponent,
    ExRequiredComponent,
    ExVariantComponent
  ],
  templateUrl: './textarea.component.html'
})
export class TeTextareaComponent {}
