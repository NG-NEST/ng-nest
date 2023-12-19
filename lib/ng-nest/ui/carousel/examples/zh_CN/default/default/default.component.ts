import { Component } from '@angular/core';
import { XCarouselComponent, XCarouselPanelComponent } from '@ng-nest/ui/carousel';
import { XColComponent, XRowComponent } from '@ng-nest/ui/layout';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [XRowComponent, XColComponent, XCarouselComponent, XCarouselPanelComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  list = [1, 2, 3, 4, 5];
}
