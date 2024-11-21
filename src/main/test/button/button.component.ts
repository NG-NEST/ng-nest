import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExDisabledComponent,
  ExGroupComponent,
  ExLoadingComponent,
  ExSizeComponent,
  ExTextComponent
} from '@ng-nest/ui/button/examples';

@Component({
  selector: 'te-button',
  imports: [
    ExDefaultComponent,
    ExDisabledComponent,
    ExGroupComponent,
    ExLoadingComponent,
    ExSizeComponent,
    ExTextComponent
  ],
  templateUrl: './button.component.html'
})
export class TeButtonComponent {}
