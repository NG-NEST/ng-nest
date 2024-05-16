import { Component, signal } from '@angular/core';
import { XCrumbComponent } from '@ng-nest/ui/crumb';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [XCrumbComponent],
  templateUrl: './default.component.html'
})
export class ExDefaultComponent {
  data = signal(['Home', 'User Manager', 'User List', 'User Detail']);
}
