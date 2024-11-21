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
  ExSizeComponent
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
    ExSizeComponent
  ],
  templateUrl: './select.component.html'
})
export class TeSelectComponent {}
