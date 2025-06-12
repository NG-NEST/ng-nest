import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExAsyncComponent,
  ExBorderedComponent,
  ExCustomComponent,
  ExDisabledComponent,
  ExLabelComponent,
  ExMultipleComponent,
  ExRequiredComponent,
  ExSearchComponent,
  ExSizeComponent,
  ExInputComponent
} from '@ng-nest/ui/select/examples';

@Component({
  selector: 'te-select',
  imports: [
    ExDefaultComponent,
    ExAsyncComponent,
    ExBorderedComponent,
    ExCustomComponent,
    ExDisabledComponent,
    ExLabelComponent,
    ExMultipleComponent,
    ExRequiredComponent,
    ExSearchComponent,
    ExSizeComponent,
    ExInputComponent
  ],
  templateUrl: './select.component.html'
})
export class TeSelectComponent {}
