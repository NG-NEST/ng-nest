import { Component } from '@angular/core';
import { XSelectComponent, XSelectNode } from '@ng-nest/ui/select';
import { XData } from '@ng-nest/ui/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ex-disabled',
  standalone: true,
  imports: [FormsModule, XSelectComponent],
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.scss']
})
export class ExDisabledComponent {
  data: XData<XSelectNode> = ['AAAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE', 'FFFF', 'GGGG', 'HHHH', 'IIII', 'JJJJ'];
  model = 'CCCC';
}
