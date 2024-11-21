import { Component, signal } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XCardComponent } from '@ng-nest/ui/card';

@Component({
  selector: 'ex-header',
  imports: [XCardComponent, XButtonComponent],
  templateUrl: './header.component.html'
})
export class ExHeaderComponent {
  list = signal([1, 2, 3, 4, 5, 6]);
}
