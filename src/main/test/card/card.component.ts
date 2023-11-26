import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExHeaderComponent,
  ExImgComponent,
  ExShadowComponent
} from '@ng-nest/ui/card/examples';

@Component({
  selector: 'te-card',
  standalone: true,
  imports: [ExDefaultComponent, ExHeaderComponent, ExImgComponent, ExShadowComponent],
  templateUrl: './card.component.html'
})
export class TeCardComponent {}
