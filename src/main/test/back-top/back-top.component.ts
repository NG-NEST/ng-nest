import { Component } from '@angular/core';
import {
  ExCustomComponent,
  ExDefaultComponent,
  ExTargetComponent
} from '@ng-nest/ui/back-top/examples';

@Component({
  selector: 'te-back-top',
  imports: [ExDefaultComponent, ExCustomComponent, ExTargetComponent],
  templateUrl: './back-top.component.html'
})
export class TeBackTopComponent {}
