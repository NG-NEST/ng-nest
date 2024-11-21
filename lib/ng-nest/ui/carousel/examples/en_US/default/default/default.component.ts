import { Component, signal } from '@angular/core';
import { XCarouselComponent, XCarouselPanelComponent } from '@ng-nest/ui/carousel';
import { XColComponent, XRowComponent } from '@ng-nest/ui/layout';

@Component({
  selector: 'ex-default',
  imports: [XRowComponent, XColComponent, XCarouselComponent, XCarouselPanelComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  list = signal([1, 2, 3, 4, 5]);
}
