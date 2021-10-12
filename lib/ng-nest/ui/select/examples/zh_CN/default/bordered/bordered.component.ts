import { Component } from '@angular/core';
import { XData } from '@ng-nest/ui/core';
import { XSelectNode } from '@ng-nest/ui/select';

@Component({
  selector: 'ex-bordered',
  templateUrl: './bordered.component.html',
  styleUrls: ['./bordered.component.scss']
})
export class ExBorderedComponent {
  data: XData<XSelectNode> = ['AAAA', 'AAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE', 'FFFF', 'GGGG', 'HHHH', 'IIII', 'JJJJ'];
}
