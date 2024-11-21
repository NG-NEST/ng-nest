import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XColorPickerComponent } from '@ng-nest/ui/color-picker';
import type { XSize } from '@ng-nest/ui/core';
import { XRadioComponent } from '@ng-nest/ui/radio';

@Component({
  selector: 'ex-size',
  imports: [FormsModule, XColorPickerComponent, XRadioComponent],
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class ExSizeComponent {
  radioData = signal(['big', 'large', 'medium', 'small', 'mini']);
  size = signal<XSize>('medium');
}
