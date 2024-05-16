import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XColorPickerComponent } from '@ng-nest/ui/color-picker';

@Component({
  selector: 'ex-required',
  standalone: true,
  imports: [FormsModule, XColorPickerComponent],
  templateUrl: './required.component.html',
  styleUrls: ['./required.component.scss']
})
export class ExRequiredComponent {
  model = signal<string | null>(null);
}
