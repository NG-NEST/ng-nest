import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExHeaderComponent,
  ExImgComponent,
  ExShadowComponent,
  ExVariantComponent
} from '@ng-nest/ui/card/examples';

@Component({
  selector: 'te-card',
  imports: [ExDefaultComponent, ExHeaderComponent, ExImgComponent, ExShadowComponent, ExVariantComponent],
  templateUrl: './card.component.html'
})
export class TeCardComponent {}
