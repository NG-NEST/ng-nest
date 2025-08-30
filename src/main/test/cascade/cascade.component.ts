import { Component } from '@angular/core';
import {
  ExBorderedComponent,
  ExDefaultComponent,
  ExDisabledComponent,
  ExHoverComponent,
  ExLabelComponent,
  ExRequiredComponent,
  ExSizeComponent,
  ExVariantComponent
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
    ExVariantComponent
  ],
  templateUrl: './cascade.component.html'
})
export class TeCascadeComponent {}
