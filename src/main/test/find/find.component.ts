import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExBorderedComponent,
  ExDisabledComponent,
  ExLabelComponent,
  ExSizeComponent,
  ExTreeComponent,
  ExTreeTableComponent
} from '@ng-nest/ui/find/examples';

@Component({
  selector: 'te-find',
  imports: [
    ExDefaultComponent,
    ExBorderedComponent,
    ExDisabledComponent,
    ExLabelComponent,
    ExSizeComponent,
    ExTreeComponent,
    ExTreeTableComponent
  ],
  templateUrl: './find.component.html'
})
export class TeFindComponent {}
