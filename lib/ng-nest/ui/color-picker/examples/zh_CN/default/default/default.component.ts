import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XColorPickerComponent } from '@ng-nest/ui/color-picker';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [FormsModule, XColorPickerComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  model1 = signal<string | null>(null);
  model2 = signal('#409eff');
  model3 = signal('rgb(64, 158, 255)');
  model4 = signal('hsl(210, 100%, 63%)');
}
