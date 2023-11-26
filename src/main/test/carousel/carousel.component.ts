import { Component } from '@angular/core';
import {
  ExArrowComponent,
  ExCardComponent,
  ExDefaultComponent,
  ExDirectionComponent
} from '@ng-nest/ui/carousel/examples';

@Component({
  selector: 'te-carousel',
  standalone: true,
  imports: [ExDefaultComponent, ExArrowComponent, ExCardComponent, ExDirectionComponent],
  templateUrl: './carousel.component.html'
})
export class TeCarouselComponent {}
