import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XInputComponent } from '@ng-nest/ui/input';

@Component({
  selector: 'ex-required',
  imports: [FormsModule, XInputComponent],
  templateUrl: './required.component.html',
  styleUrls: ['./required.component.scss']
})
export class ExRequiredComponent {
  value = signal('');
}
