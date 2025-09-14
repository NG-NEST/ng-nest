import { Component } from '@angular/core';
import {
  ExAvatarComponent,
  ExDefaultComponent,
  ExHeaderComponent,
  ExVariantComponent,
  ExLoadingComponent,
  ExTypingComponent
} from '@ng-nest/ui/bubble/examples';

@Component({
  selector: 'te-bubble',
  imports: [
    ExDefaultComponent,
    ExAvatarComponent,
    ExVariantComponent,
    ExHeaderComponent,
    ExLoadingComponent,
    ExTypingComponent
  ],
  templateUrl: './bubble.component.html'
})
export class TeBubbleComponent {}
