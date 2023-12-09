import { Component } from '@angular/core';
import { XSelectComponent, XSelectNode } from '@ng-nest/ui/select';
import { XData } from '@ng-nest/ui/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ex-required',
  standalone: true,
  imports: [FormsModule, XSelectComponent],
  templateUrl: './required.component.html',
  styleUrls: ['./required.component.scss']
})
export class ExRequiredComponent {
  data: XData<XSelectNode> = ['AAAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE', 'FFFF', 'GGGG', 'HHHH', 'IIII', 'JJJJ'];
  model!: number;
}
