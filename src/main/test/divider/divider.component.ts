import { Component } from '@angular/core';
import {
  ExDefaultComponent,
  ExDirectionComponent,
  ExPositionComponent,
  ExVariantComponent,
  ExSizeComponent
} from '@ng-nest/ui/divider/examples';

@Component({
  selector: 'te-divider',
  imports: [ExDefaultComponent, ExDirectionComponent, ExPositionComponent, ExVariantComponent, ExSizeComponent],
  templateUrl: './divider.component.html'
})
export class TeDividerComponent {}