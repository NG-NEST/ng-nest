import { Component, signal } from '@angular/core';
import { XSelectComponent } from '@ng-nest/ui/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ex-required',
  imports: [FormsModule, XSelectComponent],
  templateUrl: './required.component.html',
  styleUrls: ['./required.component.scss']
})
export class ExRequiredComponent {
  data = signal(['AAAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE', 'FFFF', 'GGGG', 'HHHH', 'IIII', 'JJJJ']);
  model = signal<string>('');
}
