import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExCustomValueComponent,
  ExDisabledComponent,
  ExIconComponent,
  ExLabelComponent,
  ExLimitComponent,
  ExMarksComponent,
  ExPrecisionComponent,
  ExRangeComponent,
  ExReverseComponent,
  ExVerticalComponent
} from '@ng-nest/ui/slider-select/examples';

@Component({
  selector: 'te-slider-select',
  imports: [
    ExDefaultComponent,
    ExCustomValueComponent,
    ExDisabledComponent,
    ExIconComponent,
    ExLabelComponent,
    ExLimitComponent,
    ExMarksComponent,
    ExPrecisionComponent,
    ExRangeComponent,
    ExReverseComponent,
    ExVerticalComponent
  ],
  templateUrl: './slider-select.component.html'
})
export class TeSliderSelectComponent {}
