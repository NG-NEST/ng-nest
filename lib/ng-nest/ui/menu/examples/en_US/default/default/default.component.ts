import { Component, signal } from '@angular/core';
import { XMenuComponent } from '@ng-nest/ui/menu';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [XMenuComponent],
  templateUrl: './default.component.html'
})
export class ExDefaultComponent {
  data = signal(['Latest Events', 'Products', 'Solutions', 'Help and Support']);
}
