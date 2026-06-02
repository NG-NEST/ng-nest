import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExAsyncComponent,
  ExBorderedComponent,
  ExCustomComponent,
  ExDisabledComponent,
  ExLabelComponent,
  ExMultipleComponent,
  ExRequiredComponent,
  ExSearchComponent,
  ExSizeComponent,
  ExInputComponent,
  ExVariantComponent,
  ExFloatLabelComponent,
  ExAutoWidthComponent,
  ExPortalTempComponent
} from '@ng-nest/ui/select/examples';

@Component({
  selector: 'te-select',
  imports: [
    ExDefaultComponent,
    ExAsyncComponent,
    ExBorderedComponent,
    ExCustomComponent,
    ExDisabledComponent,
    ExLabelComponent,
    ExMultipleComponent,
    ExRequiredComponent,
    ExSearchComponent,
    ExSizeComponent,
    ExInputComponent,
    ExVariantComponent,
    ExFloatLabelComponent,
    ExAutoWidthComponent,
    ExPortalTempComponent
  ],
  templateUrl: './select.component.html'
})
export class TeSelectComponent {}
