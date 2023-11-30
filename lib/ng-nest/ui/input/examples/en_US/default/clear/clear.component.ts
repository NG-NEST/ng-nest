import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XInputComponent } from '@ng-nest/ui/input';

@Component({
  selector: 'ex-clear',
  standalone: true,
  imports: [FormsModule, XInputComponent],
  templateUrl: './clear.component.html',
  styleUrls: ['./clear.component.scss']
})
export class ExClearComponent {
  model = 'clear data';
}
