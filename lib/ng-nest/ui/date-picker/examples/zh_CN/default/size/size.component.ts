import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XSize } from '@ng-nest/ui/core';
import { XDatePickerComponent } from '@ng-nest/ui/date-picker';
import { XRadioComponent } from '@ng-nest/ui/radio';

@Component({
  selector: 'ex-size',
  standalone: true,
  imports: [FormsModule, XDatePickerComponent, XRadioComponent],
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class ExSizeComponent {
  radioData = ['big', 'large', 'medium', 'small', 'mini'];
  size: XSize = 'medium';
}
