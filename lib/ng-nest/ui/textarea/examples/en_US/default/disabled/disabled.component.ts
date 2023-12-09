import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XTextareaComponent } from '@ng-nest/ui/textarea';

@Component({
  selector: 'ex-disabled',
  standalone: true,
  imports: [FormsModule, XTextareaComponent],
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.scss']
})
export class ExDisabledComponent {
  model = 'input disabled';
  modelClearable = 'the clear button is not display in the disabled state';
}
