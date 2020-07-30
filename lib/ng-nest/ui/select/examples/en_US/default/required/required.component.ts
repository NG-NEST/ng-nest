import { Component } from '@angular/core';
import { XSelectNode } from '@ng-nest/ui/select';
import { XData } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-required',
  templateUrl: './required.component.html',
  styleUrls: ['./required.component.scss']
})
export class ExRequiredComponent {
  data: XData<XSelectNode> = ['AAAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE', 'FFFF', 'GGGG', 'HHHH', 'IIII', 'JJJJ'];
  model: number;
}
