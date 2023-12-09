import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XTextareaComponent } from '@ng-nest/ui/textarea';

@Component({
  selector: 'ex-length',
  standalone: true,
  imports: [FormsModule, XTextareaComponent],
  templateUrl: './length.component.html',
  styleUrls: ['./length.component.scss']
})
export class ExLengthComponent {
  value: any;
}
