import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExDisabledComponent,
  ExGroupComponent,
  ExIconComponent,
  ExLoadingComponent,
  ExSizeComponent,
  ExTextComponent
} from '@ng-nest/ui/button/examples';

@Component({
  selector: 'te-button',
  standalone: true,
  imports: [
    ExDefaultComponent,
    ExDisabledComponent,
    ExGroupComponent,
    ExIconComponent,
    ExLoadingComponent,
    ExSizeComponent,
    ExTextComponent
  ],
  templateUrl: './button.component.html'
})
export class TeButtonComponent {}
