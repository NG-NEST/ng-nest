import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExAsyncComponent,
  ExButtonComponent,
  ExCheckAllComponent,
  ExDisabledComponent,
  ExIconComponent,
  ExPerpostComponent,
  ExTagComponent
} from '@ng-nest/ui/checkbox/examples';

@Component({
  selector: 'te-checkbox',
  standalone: true,
  imports: [
    ExDefaultComponent,
    ExAsyncComponent,
    ExButtonComponent,
    ExCheckAllComponent,
    ExDisabledComponent,
    ExIconComponent,
    ExPerpostComponent,
    ExTagComponent
  ],
  templateUrl: './checkbox.component.html'
})
export class TeCheckboxComponent {}
