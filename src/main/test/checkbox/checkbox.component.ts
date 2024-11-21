import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExAsyncComponent,
  ExButtonComponent,
  ExCheckAllComponent,
  ExDisabledComponent,
  ExIconComponent,
  ExPerpostComponent,
  ExTagComponent,
  ExVerticalComponent,
  ExSingleComponent
} from '@ng-nest/ui/checkbox/examples';

@Component({
  selector: 'te-checkbox',
  imports: [
    ExDefaultComponent,
    ExAsyncComponent,
    ExButtonComponent,
    ExCheckAllComponent,
    ExDisabledComponent,
    ExIconComponent,
    ExPerpostComponent,
    ExTagComponent,
    ExVerticalComponent,
    ExSingleComponent
  ],
  templateUrl: './checkbox.component.html'
})
export class TeCheckboxComponent {}
