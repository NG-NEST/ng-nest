import { Component } from '@angular/core';
import {
  ExAvatarComponent,
  ExDefaultComponent,
  ExHeaderComponent,
  ExVariantComponent,
  ExLoadingComponent,
  ExTypingComponent,
  ExRendererComponent,
  ExListComponent
} from '@ng-nest/ui/bubble/examples';

@Component({
  selector: 'te-bubble',
  imports: [
    ExDefaultComponent,
    ExAvatarComponent,
    ExVariantComponent,
    ExHeaderComponent,
    ExLoadingComponent,
    ExTypingComponent,
    ExRendererComponent,
    ExListComponent
  ],
  templateUrl: './bubble.component.html'
})
export class TeBubbleComponent {}
