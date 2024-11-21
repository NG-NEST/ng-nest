import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExBorderedComponent,
  ExCheckedComponent,
  ExCloseComponent,
  ExColorComponent,
  ExSizeComponent
} from '@ng-nest/ui/tag/examples';

@Component({
  selector: 'te-tag',
  imports: [
    ExDefaultComponent,
    ExBorderedComponent,
    ExCheckedComponent,
    ExCloseComponent,
    ExColorComponent,
    ExSizeComponent
  ],
  templateUrl: './tag.component.html'
})
export class TeTagComponent {}
