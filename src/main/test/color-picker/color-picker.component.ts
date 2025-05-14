import { Component } from '@angular/core';
import {
  ExBorderedComponent,
  ExDefaultComponent,
  ExDisabledComponent,
  ExLabelComponent,
  ExPanelComponent,
  ExRequiredComponent,
  ExSizeComponent
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
    ExPanelComponent
  ],
  templateUrl: './color-picker.component.html'
})
export class TeColorPickerComponent {}
