import { Component } from '@angular/core';
import { XAlertComponent } from '@ng-nest/ui/alert';

@Component({
  selector: 'ex-description',
  standalone: true,
  imports: [XAlertComponent],
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class ExDescriptionComponent {
  content = `The more you learn, the more you don't know.`;
}
