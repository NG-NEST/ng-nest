import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XSize } from '@ng-nest/ui/core';
import { XRadioComponent } from '@ng-nest/ui/radio';
import { XTimePickerComponent } from '@ng-nest/ui/time-picker';

@Component({
  selector: 'ex-size',
  standalone: true,
  imports: [FormsModule, XTimePickerComponent, XRadioComponent],
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class ExSizeComponent {
  radioData = ['big', 'large', 'medium', 'small', 'mini'];
  size: XSize = 'medium';
  model: any;
}
