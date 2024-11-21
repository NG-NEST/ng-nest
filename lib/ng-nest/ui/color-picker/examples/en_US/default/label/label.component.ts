import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XColorPickerComponent } from '@ng-nest/ui/color-picker';

@Component({
  selector: 'ex-label',
  imports: [FormsModule, XColorPickerComponent],
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class ExLabelComponent {
  model = signal<string | null>(null);
}
