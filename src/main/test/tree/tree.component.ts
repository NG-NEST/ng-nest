import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExActivatedComponent,
  ExCheckboxComponent,
  ExControlComponent,
  ExCustomComponent,
  ExDragComponent,
  ExHeightComponent,
  ExIconComponent,
  ExLazyComponent,
  ExLineComponent,
  ExOpenComponent,
  ExStatusComponent,
  ExVirtualScrollComponent,
  ExSortComponent
} from '@ng-nest/ui/tree/examples';

@Component({
  selector: 'te-tree',
  imports: [
    ExDefaultComponent,
    ExActivatedComponent,
    ExCheckboxComponent,
    ExControlComponent,
    ExCustomComponent,
    ExDragComponent,
    ExHeightComponent,
    ExIconComponent,
    ExLazyComponent,
    ExLineComponent,
    ExOpenComponent,
    ExStatusComponent,
    ExVirtualScrollComponent,
    ExSortComponent
  ],
  templateUrl: './tree.component.html'
})
export class TeTreeComponent {}
