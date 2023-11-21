import { Component } from '@angular/core';
import { ExBadgeComponent } from './badge/badge.component';
import { ExDefaultComponent } from './default/default.component';
import { ExDisplayComponent } from './display/display.component';
import { ExFallbackComponent } from './fallback/fallback.component';
import { ExFitComponent } from './fit/fit.component';
import { ExGroupComponent } from './group/group.component';
import { ExLabelComponent } from './label/label.component';
import { ExResponseComponent } from './response/response.component';

@Component({
  selector: 'te-avatar',
  standalone: true,
  imports: [
    ExBadgeComponent,
    ExDefaultComponent,
    ExDisplayComponent,
    ExFallbackComponent,
    ExFitComponent,
    ExGroupComponent,
    ExLabelComponent,
    ExResponseComponent
  ],
  templateUrl: './avatar.component.html'
})
export class TeAvatarComponent {}
