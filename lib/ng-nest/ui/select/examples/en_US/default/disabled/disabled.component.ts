import { Component, signal } from '@angular/core';
import { XSelectComponent } from '@ng-nest/ui/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ex-disabled',
  imports: [FormsModule, XSelectComponent],
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.scss']
})
export class ExDisabledComponent {
  data = signal(['AAAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE', 'FFFF', 'GGGG', 'HHHH', 'IIII', 'JJJJ']);
  model = signal('CCCC');
}
