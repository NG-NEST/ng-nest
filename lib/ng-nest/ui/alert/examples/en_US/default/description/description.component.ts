import { Component, signal } from '@angular/core';
import { XAlertComponent } from '@ng-nest/ui/alert';

@Component({
  selector: 'ex-description',
  imports: [XAlertComponent],
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class ExDescriptionComponent {
  content = signal(`The more you learn, the more you don't know.`);
}
