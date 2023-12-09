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
  ExVirtualScrollComponent
} from '@ng-nest/ui/tree/examples';

@Component({
  selector: 'te-tree',
  standalone: true,
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
    ExVirtualScrollComponent
  ],
  templateUrl: './tree.component.html'
})
export class TeTreeComponent {}
