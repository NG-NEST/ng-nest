import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XSelectComponent } from '@ng-nest/ui/select';

@Component({
  selector: 'ex-custom',
  imports: [FormsModule, XSelectComponent],
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class ExCustomComponent {
  data1 = signal(['AAAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE', 'FFFF', 'GGGG', 'HHHH', 'IIII', 'JJJJ']);
  model1 = signal('');
  data2 = signal([...this.data1()]);
  model2 = signal<string[]>([]);
}
