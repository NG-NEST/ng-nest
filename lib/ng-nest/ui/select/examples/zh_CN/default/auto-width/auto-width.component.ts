import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XSelectComponent } from '@ng-nest/ui/select';

@Component({
  selector: 'ex-auto-width',
  imports: [FormsModule, XSelectComponent],
  templateUrl: './auto-width.component.html',
  styleUrls: ['./auto-width.component.scss']
})
export class ExAutoWidthComponent {
  data = signal(['AAAAA', 'BBBBBBBB', 'CCCCCCCCCCCC', 'DDDDDDDDDDDDDDDDDDDD']);
  model = signal('CCCCCCCCCCCC');

  data1 = signal([
    {
      id: 1,
      label: 'AAAAA'
    },
    {
      id: 2,
      label: 'BBBBBBBB'
    },
    {
      id: 3,
      label: 'CCCCCCCCCCCC'
    },
    {
      id: 4,
      label: 'DDDDDDDDDDDDDDDDDDDD'
    },
    {
      id: 5,
      label: 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE'
    }
  ]);
  model1 = signal(3);
}
