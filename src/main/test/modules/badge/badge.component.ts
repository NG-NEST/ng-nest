import { Component } from '@angular/core';
import { ExDefaultComponent } from './default/default.component';
import { ExOffsetComponent } from './offset/offset.component';
import { ExStandaloneComponent } from './standalone/standalone.component';
import { ExAnimationComponent } from './animation/animation.component';
import { ExColorComponent } from './color/color.component';
import { ExCustomComponent } from './custom/custom.component';
import { ExDotComponent } from './dot/dot.component';
import { ExMaxComponent } from './max/max.component';

@Component({
  selector: 'te-badge',
  standalone: true,
  imports: [
    ExAnimationComponent,
    ExColorComponent,
    ExCustomComponent,
    ExDefaultComponent,
    ExDotComponent,
    ExMaxComponent,
    ExOffsetComponent,
    ExStandaloneComponent
  ],
  templateUrl: './badge.component.html'
})
export class TeBadgeComponent {}
