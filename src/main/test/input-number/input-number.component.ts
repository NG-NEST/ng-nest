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
  ExSizeComponent
} from '@ng-nest/ui/input-number/examples';

@Component({
  selector: 'te-input-number',
  standalone: true,
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
    ExHiddenButtonComponent
  ],
  templateUrl: './input-number.component.html'
})
export class TeInputNumberComponent {}
