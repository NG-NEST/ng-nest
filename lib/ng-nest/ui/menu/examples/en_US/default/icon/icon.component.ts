import { Component } from '@angular/core';

@Component({
  selector: 'ex-icon',
  templateUrl: './icon.component.html'
})
export class ExIconComponent {
  data = ['latest events', { label: 'product', icon: 'fto-package' }, 'solution', { label: 'Help and support', icon: 'fto-phone' }];
}
