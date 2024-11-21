import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExCustomComponent,
  ExDragComponent,
  ExFooterComponent,
  ExInverseComponent,
  ExSearchComponent,
  ExTableComponent,
  ExTreeComponent
} from '@ng-nest/ui/transfer/examples';

@Component({
  selector: 'te-transfer',
  imports: [
    ExDefaultComponent,
    ExCustomComponent,
    ExDragComponent,
    ExFooterComponent,
    ExInverseComponent,
    ExSearchComponent,
    ExTableComponent,
    ExTreeComponent
  ],
  templateUrl: './transfer.component.html'
})
export class TeTransferComponent {}
