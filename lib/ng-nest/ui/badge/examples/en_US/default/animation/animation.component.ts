import { Component } from '@angular/core';
import { XBadgeComponent } from '@ng-nest/ui/badge';
import { XButtonComponent, XButtonsComponent } from '@ng-nest/ui/button';

@Component({
  selector: 'ex-animation',
  standalone: true,
  imports: [XBadgeComponent, XButtonComponent, XButtonsComponent],
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.scss']
})
export class ExAnimationComponent {
  value = 10;

  valueMax = 98;

  onPlus(num: number) {
    this.value = this.value + num;
    this.valueMax = this.valueMax + num;
  }
}
