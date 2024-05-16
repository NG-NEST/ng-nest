import { Component, signal } from '@angular/core';
import { XCrumbComponent } from '@ng-nest/ui/crumb';

@Component({
  selector: 'ex-icon',
  standalone: true,
  imports: [XCrumbComponent],
  templateUrl: './icon.component.html'
})
export class ExIconComponent {
  data = signal([{ icon: 'fto-home' }, { label: 'User Manager', icon: 'fto-user' }, 'User List', 'User Detail']);
}
