import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { XCarouselComponent, XCarouselPanelComponent } from '@ng-nest/ui/carousel';

@Component({
  selector: 'ex-direction',
  standalone: true,
  imports: [CommonModule, XCarouselComponent, XCarouselPanelComponent],
  templateUrl: './direction.component.html',
  styleUrls: ['./direction.component.scss']
})
export class ExDirectionComponent {
  list = [1, 2, 3, 4, 5];
}
