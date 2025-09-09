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
  ExVariantComponent,
  ExFloatLabelComponent
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
    ExVariantComponent,
    ExFloatLabelComponent
  ],
  templateUrl: './time-picker.component.html'
})
export class TeTimePickerComponent {}
