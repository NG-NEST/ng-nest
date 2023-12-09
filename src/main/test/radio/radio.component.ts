import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExIconComponent,
  ExAsyncComponent,
  ExButtonComponent,
  ExDisabledComponent,
  ExPerpostComponent,
  ExTagComponent
} from '@ng-nest/ui/radio/examples';

@Component({
  selector: 'te-radio',
  standalone: true,
  imports: [
    ExDefaultComponent,
    ExIconComponent,
    ExAsyncComponent,
    ExButtonComponent,
    ExDisabledComponent,
    ExPerpostComponent,
    ExTagComponent
  ],
  templateUrl: './radio.component.html'
})
export class TeRadioComponent {}
