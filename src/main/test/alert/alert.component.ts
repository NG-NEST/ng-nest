import { Component } from '@angular/core';
import {
  ExCustomComponent,
  ExDefaultComponent,
  ExDescriptionComponent,
  ExEffectComponent,
  ExIconComponent
} from '@ng-nest/ui/alert/examples';

@Component({
  selector: 'te-alert',
  imports: [
    ExDefaultComponent,
    ExCustomComponent,
    ExDescriptionComponent,
    ExEffectComponent,
    ExIconComponent
  ],
  templateUrl: './alert.component.html'
})
export class TeAlertComponent {}
