import { Component } from '@angular/core';
import {
  ExAnimationComponent,
  ExColorComponent,
  ExCustomComponent,
  ExDefaultComponent,
  ExDotComponent,
  ExMaxComponent,
  ExOffsetComponent,
  ExStandaloneComponent
} from '@ng-nest/ui/badge/examples';

@Component({
  selector: 'te-badge',
  imports: [
    ExDefaultComponent,
    ExAnimationComponent,
    ExColorComponent,
    ExCustomComponent,
    ExDotComponent,
    ExMaxComponent,
    ExOffsetComponent,
    ExStandaloneComponent
  ],
  templateUrl: './badge.component.html'
})
export class TeBadgeComponent {}
