import { Component, signal } from '@angular/core';
import { XSelectComponent } from '@ng-nest/ui/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ex-label',
  standalone: true,
  imports: [FormsModule, XSelectComponent],
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class ExLabelComponent {
  data = signal(['AAAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE', 'FFFF', 'GGGG', 'HHHH', 'IIII', 'JJJJ']);
  model = signal('');
}
