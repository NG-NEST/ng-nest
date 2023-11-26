import { Component } from '@angular/core';
import {
  ExBadgeComponent,
  ExDefaultComponent,
  ExDisplayComponent,
  ExFallbackComponent,
  ExFitComponent,
  ExGroupComponent,
  ExLabelComponent,
  ExResponseComponent
} from '@ng-nest/ui/avatar/examples';

@Component({
  selector: 'te-avatar',
  standalone: true,
  imports: [
    ExDefaultComponent,
    ExBadgeComponent,
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
