import { Component } from '@angular/core';
import { XMenuComponent } from '@ng-nest/ui/menu';

@Component({
  selector: 'ex-icon',
  standalone: true,
  imports: [XMenuComponent],
  templateUrl: './icon.component.html'
})
export class ExIconComponent {
  data = [
    'latest events',
    { label: 'product', icon: 'fto-package' },
    'solution',
    { label: 'Help and support', icon: 'fto-phone' }
  ];
}
