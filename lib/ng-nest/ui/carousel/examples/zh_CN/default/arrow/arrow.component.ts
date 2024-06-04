import { Component, signal } from '@angular/core';
import { XCarouselComponent, XCarouselPanelComponent } from '@ng-nest/ui/carousel';

@Component({
  selector: 'ex-arrow',
  standalone: true,
  imports: [XCarouselComponent, XCarouselPanelComponent],
  templateUrl: './arrow.component.html',
  styleUrls: ['./arrow.component.scss']
})
export class ExArrowComponent {
  list = signal([1, 2, 3, 4, 5]);
}
