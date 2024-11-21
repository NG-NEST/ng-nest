import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XTimePickerComponent } from '@ng-nest/ui/time-picker';

@Component({
  selector: 'ex-default',
  imports: [FormsModule, XTimePickerComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  model1 = signal('');
  model2 = signal(new Date());
}
