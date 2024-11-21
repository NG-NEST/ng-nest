import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { XSize } from '@ng-nest/ui/core';
import { XRadioComponent } from '@ng-nest/ui/radio';
import { XTimePickerComponent } from '@ng-nest/ui/time-picker';

@Component({
  selector: 'ex-size',
  imports: [FormsModule, XTimePickerComponent, XRadioComponent],
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class ExSizeComponent {
  radioData = signal(['big', 'large', 'medium', 'small', 'mini']);
  size = signal<XSize>('medium');
  model = signal('');
}
