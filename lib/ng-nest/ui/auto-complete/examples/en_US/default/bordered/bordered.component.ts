import { Component } from '@angular/core';
import { XAutoCompleteNode } from '@ng-nest/ui/auto-complete';
import { XData } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-bordered',
  templateUrl: './bordered.component.html',
  styleUrls: ['./bordered.component.scss']
})
export class ExBorderedComponent {
  data: XData<XAutoCompleteNode> = ['AAAA', 'AAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE', 'FFFF', 'GGGG', 'HHHH', 'IIII', 'JJJJ'];
}
