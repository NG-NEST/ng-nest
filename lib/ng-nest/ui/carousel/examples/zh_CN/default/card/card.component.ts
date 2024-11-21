import { Component, signal } from '@angular/core';
import { XCarouselComponent, XCarouselPanelComponent } from '@ng-nest/ui/carousel';

@Component({
  selector: 'ex-card',
  imports: [XCarouselComponent, XCarouselPanelComponent],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class ExCardComponent {
  list = signal([1, 2, 3, 4, 5]);
}
