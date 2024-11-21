import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XListComponent } from '@ng-nest/ui/list';

@Component({
  selector: 'ex-default',
  imports: [FormsModule, XListComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  data = signal(['AAAA', 'BBBB', { label: 'CCCC', leaf: true }, 'DDDD']);
  data1 = signal(JSON.parse(JSON.stringify(this.data())));
  data2 = signal(JSON.parse(JSON.stringify(this.data())));
  data3 = signal(JSON.parse(JSON.stringify(this.data())));
  data4 = signal(JSON.parse(JSON.stringify(this.data())));
  data5 = signal(JSON.parse(JSON.stringify(this.data())));
  data6 = signal(JSON.parse(JSON.stringify(this.data())));
  data7 = signal(JSON.parse(JSON.stringify(this.data())));
  data8 = signal(JSON.parse(JSON.stringify(this.data())));
  data9 = signal(JSON.parse(JSON.stringify(this.data())));
  model1 = signal('');
  model2 = signal('AAAA');
  model3 = signal<string[]>([]);
  model4 = signal(['AAAA', 'BBBB']);
  model5 = signal<string[]>([]);
  model6 = signal(['BBBB', 'CCCC']);
  model7 = signal('BBBB');
  model8 = signal('');
  model9 = signal('');
}
