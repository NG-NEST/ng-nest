import { Component } from '@angular/core';
import { XData, XSize } from '@ng-nest/ui/core';
import { XSelectNode } from '@ng-nest/ui/select';

@Component({
  selector: 'ex-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class ExSizeComponent {
  radioData = ['big', 'large', 'medium', 'small', 'mini'];
  size: XSize = 'medium';
  data: XData<XSelectNode> = ['AAAA', 'AAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE', 'FFFF', 'GGGG', 'HHHH', 'IIII', 'JJJJ'];
}
