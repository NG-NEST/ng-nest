import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XInputNumberComponent } from '@ng-nest/ui/input-number';

@Component({
  selector: 'ex-disabled',
  imports: [FormsModule, XInputNumberComponent],
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.scss']
})
export class ExDisabledComponent {
  model = signal(10);
}
