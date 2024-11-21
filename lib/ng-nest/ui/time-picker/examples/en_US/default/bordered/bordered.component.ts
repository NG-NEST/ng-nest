import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XTimePickerComponent } from '@ng-nest/ui/time-picker';

@Component({
  selector: 'ex-bordered',
  imports: [FormsModule, XTimePickerComponent],
  templateUrl: './bordered.component.html',
  styleUrls: ['./bordered.component.scss']
})
export class ExBorderedComponent {
  model = signal('');
}
