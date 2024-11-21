import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XSelectComponent } from '@ng-nest/ui/select';

@Component({
  selector: 'ex-multiple',
  imports: [FormsModule, XSelectComponent],
  templateUrl: './multiple.component.html',
  styleUrls: ['./multiple.component.scss']
})
export class ExMultipleComponent {
  data1 = signal(['AAAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE', 'FFFF', 'GGGG', 'HHHH', 'IIII', 'JJJJ']);
  data2 = signal(JSON.parse(JSON.stringify(this.data1())));
  data3 = signal(JSON.parse(JSON.stringify(this.data1())));
  data4 = signal(JSON.parse(JSON.stringify(this.data1())));
  model1 = signal<string[]>([]);
  model2 = signal([
    { id: 'AAAA', label: 'AAAA' },
    { id: 'BBBB', label: 'BBBB' }
  ]);
  model3 = signal<string[]>([]);
  model4 = signal(['AAAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE', 'FFFF', 'GGGG', 'HHHH', 'IIII', 'JJJJ']);

  change(event: any) {
    console.log(event);
  }
}
