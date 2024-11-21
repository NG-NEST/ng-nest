import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XColorPickerComponent } from '@ng-nest/ui/color-picker';

@Component({
  selector: 'ex-disabled',
  imports: [FormsModule, XColorPickerComponent],
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.scss']
})
export class ExDisabledComponent {
  model = signal('#409eff');
}
