import { Component, signal } from '@angular/core';
import { XCarouselComponent, XCarouselPanelComponent } from '@ng-nest/ui/carousel';

@Component({
  selector: 'ex-direction',
  imports: [XCarouselComponent, XCarouselPanelComponent],
  templateUrl: './direction.component.html',
  styleUrls: ['./direction.component.scss']
})
export class ExDirectionComponent {
  list = signal([1, 2, 3, 4, 5]);
}
