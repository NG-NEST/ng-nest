import { Component } from '@angular/core';
import { XCardComponent } from '@ng-nest/ui/card';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [XCardComponent],
  templateUrl: './default.component.html'
})
export class ExDefaultComponent {
  list = [1, 2, 3, 4, 5, 6];
}
