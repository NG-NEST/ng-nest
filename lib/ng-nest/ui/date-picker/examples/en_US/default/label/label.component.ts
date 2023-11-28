import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XDatePickerComponent } from '@ng-nest/ui/date-picker';

@Component({
  selector: 'ex-label',
  standalone: true,
  imports: [FormsModule, XDatePickerComponent],
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class ExLabelComponent {
  model: any;
}
