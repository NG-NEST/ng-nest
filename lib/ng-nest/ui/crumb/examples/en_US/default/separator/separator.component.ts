import { Component, signal } from '@angular/core';
import { XCrumbComponent } from '@ng-nest/ui/crumb';
import { XIconComponent } from '@ng-nest/ui/icon';

@Component({
  selector: 'ex-separator',
  imports: [XCrumbComponent, XIconComponent],
  templateUrl: './separator.component.html'
})
export class ExSeparatorComponent {
  data = signal(['Home', 'User Manager', 'User List', 'User Detail']);
}
