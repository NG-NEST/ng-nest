import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExColorComponent,
  ExCustomComponent,
  ExLoadingComponent,
  ExIconComponent,
  ExModeComponent,
  ExSizeComponent,
  ExTypeComponent
} from '@ng-nest/ui/timeline/examples';

@Component({
  selector: 'te-timeline',
  imports: [
    ExDefaultComponent,
    ExColorComponent,
    ExCustomComponent,
    ExLoadingComponent,
    ExIconComponent,
    ExModeComponent,
    ExSizeComponent,
    ExTypeComponent
  ],
  templateUrl: './timeline.component.html'
})
export class TeTimelineComponent {}
