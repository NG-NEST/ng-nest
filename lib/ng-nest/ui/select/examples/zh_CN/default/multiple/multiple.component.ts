import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XSelectComponent } from '@ng-nest/ui/select';

@Component({
  selector: 'ex-multiple',
  standalone: true,
  imports: [FormsModule, XSelectComponent],
  templateUrl: './multiple.component.html',
  styleUrls: ['./multiple.component.scss']
})
export class ExMultipleComponent {
  data1 = ['AAAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE', 'FFFF', 'GGGG', 'HHHH', 'IIII', 'JJJJ'];
  data2 = JSON.parse(JSON.stringify(this.data1));
  data3 = JSON.parse(JSON.stringify(this.data1));
  data4 = JSON.parse(JSON.stringify(this.data1));
  model1: any;
  model2: any = [
    { id: 'AAAA', label: 'AAAA' },
    { id: 'BBBB', label: 'BBBB' }
  ];
  model3 = [];
  model4 = ['AAAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE', 'FFFF', 'GGGG', 'HHHH', 'IIII', 'JJJJ'];

  change(event: any) {
    console.log(event);
  }
}
