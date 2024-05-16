import { Component, signal } from '@angular/core';
import { XCrumbComponent } from '@ng-nest/ui/crumb';
import { XTagComponent } from '@ng-nest/ui/tag';

@Component({
  selector: 'ex-custom',
  standalone: true,
  imports: [XCrumbComponent, XTagComponent],
  templateUrl: './custom.component.html'
})
export class ExCustomComponent {
  data = signal(['Home', 'User Manager', 'User List', 'User Detail']);
}
