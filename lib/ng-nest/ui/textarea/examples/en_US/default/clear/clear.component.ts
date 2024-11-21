import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XTextareaComponent } from '@ng-nest/ui/textarea';

@Component({
  selector: 'ex-clear',
  imports: [FormsModule, XTextareaComponent],
  templateUrl: './clear.component.html',
  styleUrls: ['./clear.component.scss']
})
export class ExClearComponent {
  model = signal('clear data');
}
