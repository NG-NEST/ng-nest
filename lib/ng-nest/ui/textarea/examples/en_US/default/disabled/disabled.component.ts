import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XTextareaComponent } from '@ng-nest/ui/textarea';

@Component({
  selector: 'ex-disabled',
  imports: [FormsModule, XTextareaComponent],
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.scss']
})
export class ExDisabledComponent {
  model = signal('input disabled');
  modelClearable = signal('the clear button is not display in the disabled state');
}
