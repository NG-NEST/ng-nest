import { Component } from '@angular/core';
import {
  ExBorderedComponent,
  ExDefaultComponent,
  ExDisabledComponent,
  ExLabelComponent,
  ExPanelComponent,
  ExRequiredComponent,
  ExSizeComponent,
  ExVariantComponent
} from '@ng-nest/ui/color-picker/examples';

@Component({
  selector: 'te-color-picker',
  imports: [
    ExBorderedComponent,
    ExDefaultComponent,
    ExDisabledComponent,
    ExLabelComponent,
    ExRequiredComponent,
    ExSizeComponent,
    ExPanelComponent,
    ExVariantComponent
  ],
  templateUrl: './color-picker.component.html'
})
export class TeColorPickerComponent {}
