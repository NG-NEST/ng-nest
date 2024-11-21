import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExCustomComponent,
  ExGroupComponent,
  ExFallbackComponent,
  ExPlaceholderComponent
} from '@ng-nest/ui/image/examples';

@Component({
  selector: 'te-image',
  imports: [
    ExDefaultComponent,
    ExCustomComponent,
    ExGroupComponent,
    ExFallbackComponent,
    ExPlaceholderComponent
  ],
  templateUrl: './image.component.html'
})
export class TeImageComponent {}
