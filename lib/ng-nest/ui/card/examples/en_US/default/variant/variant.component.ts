import { Component, signal } from '@angular/core';
import { XCardComponent } from '@ng-nest/ui/card';

@Component({
  selector: 'ex-variant',
  imports: [XCardComponent],
  templateUrl: './variant.component.html',
  styleUrl: './variant.component.scss'
})
export class ExVariantComponent {
  list = signal([1, 2, 3, 4, 5, 6]);
}
