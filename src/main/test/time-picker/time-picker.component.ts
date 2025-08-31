import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExBorderedComponent,
  ExDisabledComponent,
  ExHourMinuteComponent,
  ExLabelComponent,
  ExPresetComponent,
  ExRequiredComponent,
  ExSizeComponent,
  ExStepComponent,
  ExUse12hoursComponent,
  ExVariantComponent
} from '@ng-nest/ui/time-picker/examples';

@Component({
  selector: 'te-time-picker',
  imports: [
    ExDefaultComponent,
    ExBorderedComponent,
    ExDisabledComponent,
    ExHourMinuteComponent,
    ExLabelComponent,
    ExPresetComponent,
    ExRequiredComponent,
    ExSizeComponent,
    ExStepComponent,
    ExUse12hoursComponent,
    ExVariantComponent
  ],
  templateUrl: './time-picker.component.html'
})
export class TeTimePickerComponent {}
