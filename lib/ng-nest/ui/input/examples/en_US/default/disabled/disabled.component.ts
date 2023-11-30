import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XInputComponent } from '@ng-nest/ui/input';

@Component({
  selector: 'ex-disabled',
  standalone: true,
  imports: [FormsModule, XInputComponent],
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.scss']
})
export class ExDisabledComponent {
  model = 'input disabled';
  modelClearable = 'the clear button is not display in the disabled state';

}
