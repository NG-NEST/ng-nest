import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExColorComponent,
  ExCustomComponent,
  ExDisabledComponent,
  ExHalfComponent
} from '@ng-nest/ui/rate/examples';

@Component({
  selector: 'te-rate',
  imports: [ExDefaultComponent, ExColorComponent, ExCustomComponent, ExDisabledComponent, ExHalfComponent],
  templateUrl: './rate.component.html'
})
export class TeRateComponent {}
