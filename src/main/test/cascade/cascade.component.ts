import { Component } from '@angular/core';
import {
  ExBorderedComponent,
  ExDefaultComponent,
  ExDisabledComponent,
  ExHoverComponent,
  ExLabelComponent,
  ExRequiredComponent,
  ExSizeComponent,
  ExVariantComponent,
  ExFloatLabelComponent
} from '@ng-nest/ui/cascade/examples';

@Component({
  selector: 'te-cascade',
  imports: [
    ExDefaultComponent,
    ExBorderedComponent,
    ExDisabledComponent,
    ExHoverComponent,
    ExLabelComponent,
    ExRequiredComponent,
    ExSizeComponent,
    ExVariantComponent,
    ExFloatLabelComponent
  ],
  templateUrl: './cascade.component.html'
})
export class TeCascadeComponent {}
