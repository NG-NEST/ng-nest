import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExDisabledComponent,
  ExIconComponent,
  ExUnderlineComponent
} from '@ng-nest/ui/link/examples';

@Component({
  selector: 'te-link',
  standalone: true,
  imports: [ExDefaultComponent, ExDisabledComponent, ExIconComponent, ExUnderlineComponent],
  templateUrl: './link.component.html'
})
export class TeLinkComponent {}
