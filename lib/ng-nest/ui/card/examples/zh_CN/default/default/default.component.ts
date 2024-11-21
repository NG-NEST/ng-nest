import { Component, signal } from '@angular/core';
import { XCardComponent } from '@ng-nest/ui/card';

@Component({
  selector: 'ex-default',
  imports: [XCardComponent],
  templateUrl: './default.component.html'
})
export class ExDefaultComponent {
  list = signal([1, 2, 3, 4, 5, 6]);
}
