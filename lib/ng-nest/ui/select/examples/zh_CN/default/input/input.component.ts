import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XSelectComponent } from '@ng-nest/ui/select';

@Component({
  selector: 'ex-input',
  standalone: true,
  imports: [FormsModule, XSelectComponent],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class ExInputComponent {
  data1 = signal(['AAAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE', 'FFFF', 'GGGG', 'HHHH', 'IIII', 'JJJJ']);
  model1 = signal('');

  change(value: string) {
    console.log(value);
  }
}
