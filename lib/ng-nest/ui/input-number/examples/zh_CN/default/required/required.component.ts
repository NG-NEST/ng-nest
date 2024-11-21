import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XInputNumberComponent } from '@ng-nest/ui/input-number';

@Component({
  selector: 'ex-required',
  imports: [FormsModule, XInputNumberComponent],
  templateUrl: './required.component.html',
  styleUrls: ['./required.component.scss']
})
export class ExRequiredComponent {
  value = signal<number | null>(null);
}
