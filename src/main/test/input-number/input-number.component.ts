import { Component } from '@angular/core';
import {
  ExBorderedComponent,
  ExDefaultComponent,
  ExDisabledComponent,
  ExFormatComponent,
  ExHiddenButtonComponent,
  ExLabelComponent,
  ExLimitComponent,
  ExPrecisionComponent,
  ExRequiredComponent,
  ExSizeComponent,
  ExVariantComponent
} from '@ng-nest/ui/input-number/examples';

@Component({
  selector: 'te-input-number',
  imports: [
    ExBorderedComponent,
    ExDefaultComponent,
    ExDisabledComponent,
    ExFormatComponent,
    ExLabelComponent,
    ExLimitComponent,
    ExPrecisionComponent,
    ExRequiredComponent,
    ExSizeComponent,
    ExHiddenButtonComponent,
    ExVariantComponent
  ],
  templateUrl: './input-number.component.html'
})
export class TeInputNumberComponent {}
