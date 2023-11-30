import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XInputComponent } from '@ng-nest/ui/input';

@Component({
  selector: 'ex-length',
  standalone: true,
  imports: [FormsModule, XInputComponent],
  templateUrl: './length.component.html',
  styleUrls: ['./length.component.scss']
})
export class ExLengthComponent {
  value: any;
}
