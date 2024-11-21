import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExLoadingComponent,
  ExDisabledComponent,
  ExLabelComponent,
  ExSizeComponent,
  ExTextComponent
} from '@ng-nest/ui/switch/examples';

@Component({
  selector: 'te-switch',
  imports: [
    ExDefaultComponent,
    ExLoadingComponent,
    ExDisabledComponent,
    ExLabelComponent,
    ExSizeComponent,
    ExTextComponent
  ],
  templateUrl: './switch.component.html'
})
export class TeSwitchComponent {}
