import { Component, signal } from '@angular/core';
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
  value = signal(10);
  valueMax = signal(98);

  onPlus(num: number) {
    this.value.update((x) => x + num);
    this.valueMax.update((x) => x + num);
  }
}
