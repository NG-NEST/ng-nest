import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExBorderedComponent,
  ExClearComponent,
  ExDisabledComponent,
  ExFocusComponent,
  ExGroupComponent,
  ExIconComponent,
  ExLabelComponent,
  ExLengthComponent,
  ExPerpostComponent,
  ExRequiredComponent,
  ExSizeComponent,
  ExVariantComponent,
  ExFloatLabelComponent,
  ExAutoWidthComponent
} from '@ng-nest/ui/input/examples';

@Component({
  selector: 'te-input',
  imports: [
    ExDefaultComponent,
    ExBorderedComponent,
    ExClearComponent,
    ExDisabledComponent,
    ExFocusComponent,
    ExGroupComponent,
    ExIconComponent,
    ExLabelComponent,
    ExLengthComponent,
    ExPerpostComponent,
    ExRequiredComponent,
    ExSizeComponent,
    ExVariantComponent,
    ExFloatLabelComponent,
    ExAutoWidthComponent
  ],
  templateUrl: './input.component.html'
})
export class TeInputComponent {}
