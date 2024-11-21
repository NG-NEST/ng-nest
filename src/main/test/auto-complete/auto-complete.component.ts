import { Component } from '@angular/core';
import {
  ExBorderedComponent,
  ExCustomComponent,
  ExDefaultComponent,
  ExDisabledComponent,
  ExLabelComponent,
  ExRequiredComponent,
  ExSizeComponent
} from '@ng-nest/ui/auto-complete/examples';

@Component({
  selector: 'te-auto-complete',
  imports: [
    ExDefaultComponent,
    ExBorderedComponent,
    ExCustomComponent,
    ExDisabledComponent,
    ExLabelComponent,
    ExRequiredComponent,
    ExSizeComponent
  ],
  templateUrl: './auto-complete.component.html'
})
export class TeAutoCompleteComponent {}
