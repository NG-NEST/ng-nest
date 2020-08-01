import { Component } from '@angular/core';

@Component({
  selector: 'ex-icon',
  templateUrl: './icon.component.html'
})
export class ExIconComponent {
  data = [{ icon: 'fto-home' }, { label: 'User Manager', icon: 'fto-user' }, 'User List', 'User Detail'];
}
