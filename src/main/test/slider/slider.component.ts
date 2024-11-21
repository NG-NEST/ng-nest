import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExActivatedComponent,
  ExCustomComponent,
  ExExpandComponent,
  ExScrollComponent,
  ExSizeComponent
} from '@ng-nest/ui/slider/examples';

@Component({
  selector: 'te-slider',
  imports: [
    ExDefaultComponent,
    ExActivatedComponent,
    ExCustomComponent,
    ExExpandComponent,
    ExScrollComponent,
    ExSizeComponent
  ],
  templateUrl: './slider.component.html'
})
export class TeSliderComponent {}
