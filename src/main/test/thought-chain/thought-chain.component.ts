import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExSizeComponent,
  ExExtraComponent,
  ExNextComponent,
  ExContentComponent,
  ExCollapsibleComponent
} from '@ng-nest/ui/thought-chain/examples';

@Component({
  selector: 'te-thought-chain',
  imports: [
    ExDefaultComponent,
    ExSizeComponent,
    ExExtraComponent,
    ExNextComponent,
    ExContentComponent,
    ExCollapsibleComponent
  ],
  templateUrl: './thought-chain.component.html'
})
export class TeThoughtChainComponent {}
