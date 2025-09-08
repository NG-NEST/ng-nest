import { Component, signal } from '@angular/core';
import { XSelectComponent } from '@ng-nest/ui/select';

@Component({
  selector: 'ex-float-label',
  imports: [XSelectComponent],
  templateUrl: './float-label.component.html',
  styleUrls: ['./float-label.component.scss']
})
export class ExFloatLabelComponent {
  data1 = signal(['AAAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE', 'FFFF', 'GGGG', 'HHHH', 'IIII', 'JJJJ']);
  data2 = signal(JSON.parse(JSON.stringify(this.data1())));
  data3 = signal(JSON.parse(JSON.stringify(this.data1())));
  data4 = signal(JSON.parse(JSON.stringify(this.data1())));
  data5 = signal(JSON.parse(JSON.stringify(this.data1())));
  data6 = signal(JSON.parse(JSON.stringify(this.data1())));
  data7 = signal(JSON.parse(JSON.stringify(this.data1())));
  data8 = signal(JSON.parse(JSON.stringify(this.data1())));
  data9 = signal(JSON.parse(JSON.stringify(this.data1())));
  data10 = signal(JSON.parse(JSON.stringify(this.data1())));
  data11 = signal(JSON.parse(JSON.stringify(this.data1())));
  data12 = signal(JSON.parse(JSON.stringify(this.data1())));
  data13 = signal(JSON.parse(JSON.stringify(this.data1())));
  data14 = signal(JSON.parse(JSON.stringify(this.data1())));
  data15 = signal(JSON.parse(JSON.stringify(this.data1())));
}
