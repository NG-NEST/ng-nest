import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExAsyncComponent,
  ExBorderedComponent,
  ExCustomComponent,
  ExDisabledComponent,
  ExLabelComponent,
  ExLeafComponent,
  ExMultipleComponent,
  ExPathComponent,
  ExRequiredComponent,
  ExScrollComponent,
  ExSearchComponent,
  ExSizeComponent
} from '@ng-nest/ui/tree-select/examples';

@Component({
  selector: 'te-tree-select',
  imports: [
    ExDefaultComponent,
    ExAsyncComponent,
    ExBorderedComponent,
    ExCustomComponent,
    ExDisabledComponent,
    ExLabelComponent,
    ExLeafComponent,
    ExMultipleComponent,
    ExPathComponent,
    ExRequiredComponent,
    ExScrollComponent,
    ExSearchComponent,
    ExSizeComponent
  ],
  templateUrl: './tree-select.component.html'
})
export class TeTreeSelectComponent {}
