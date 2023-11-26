import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { XCarouselComponent, XCarouselPanelComponent } from '@ng-nest/ui/carousel';

@Component({
  selector: 'ex-card',
  standalone: true,
  imports: [CommonModule, XCarouselComponent, XCarouselPanelComponent],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class ExCardComponent {
  list = [1, 2, 3, 4, 5];
}
