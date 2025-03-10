import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { XSize } from '@ng-nest/ui/core';
import { XInputNumberComponent } from '@ng-nest/ui/input-number';
import { XRadioComponent } from '@ng-nest/ui/radio';

@Component({
  selector: 'ex-size',
  imports: [FormsModule, XInputNumberComponent, XRadioComponent],
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class ExSizeComponent {
  radioData = signal(['big', 'large', 'medium', 'small', 'mini']);
  size = signal<XSize>('medium');
}
