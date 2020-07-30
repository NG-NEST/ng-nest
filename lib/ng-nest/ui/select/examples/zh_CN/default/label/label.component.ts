import { Component } from '@angular/core';
import { XSelectNode } from '@ng-nest/ui/select';
import { XData } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class ExLabelComponent {
  data: XData<XSelectNode> = ['AAAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE', 'FFFF', 'GGGG', 'HHHH', 'IIII', 'JJJJ'];
  model: string;
}
