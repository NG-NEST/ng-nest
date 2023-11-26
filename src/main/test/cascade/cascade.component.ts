import { Component } from '@angular/core';
import {
  ExBorderedComponent,
  ExDefaultComponent,
  ExDisabledComponent,
  ExHoverComponent,
  ExLabelComponent,
  ExRequiredComponent,
  ExSizeComponent
} from '@ng-nest/ui/cascade/examples';

@Component({
  selector: 'te-cascade',
  standalone: true,
  imports: [
    ExDefaultComponent,
    ExBorderedComponent,
    ExDisabledComponent,
    ExHoverComponent,
    ExLabelComponent,
    ExRequiredComponent,
    ExSizeComponent
  ],
  templateUrl: './cascade.component.html'
})
export class TeCascadeComponent {}
