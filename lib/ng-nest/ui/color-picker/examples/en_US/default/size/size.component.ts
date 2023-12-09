import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XColorPickerComponent } from '@ng-nest/ui/color-picker';
import { XSize } from '@ng-nest/ui/core';
import { XRadioComponent } from '@ng-nest/ui/radio';

@Component({
  selector: 'ex-size',
  standalone: true,
  imports: [FormsModule, XColorPickerComponent, XRadioComponent],
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class ExSizeComponent {
  radioData = ['big', 'large', 'medium', 'small', 'mini'];
  size: XSize = 'medium';
}
