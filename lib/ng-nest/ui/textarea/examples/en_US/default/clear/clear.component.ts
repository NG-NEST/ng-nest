import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XTextareaComponent } from '@ng-nest/ui/textarea';

@Component({
  selector: 'ex-clear',
  standalone: true,
  imports: [FormsModule, XTextareaComponent],
  templateUrl: './clear.component.html',
  styleUrls: ['./clear.component.scss']
})
export class ExClearComponent {
  model = 'clear data';
}
