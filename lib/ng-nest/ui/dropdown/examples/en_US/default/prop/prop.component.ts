import { Component, signal } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XDropdownComponent } from '@ng-nest/ui/dropdown';

@Component({
  selector: 'ex-prop',
  standalone: true,
  imports: [XDropdownComponent, XButtonComponent],
  templateUrl: './prop.component.html'
})
export class ExPropComponent {
  data = signal([
    { label: 'User manage', icon: 'fto-user' },
    { label: 'Role manage', icon: 'fto-users' },
    'Organization manage',
    { label: 'Module manage', divided: true },
    { label: 'Log manage', disabled: true }
  ]);
}
