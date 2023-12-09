import { Component } from '@angular/core';
import { XSelectComponent, XSelectNode } from '@ng-nest/ui/select';
import { XData } from '@ng-nest/ui/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ex-label',
  standalone: true,
  imports: [FormsModule, XSelectComponent],
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class ExLabelComponent {
  data: XData<XSelectNode> = ['AAAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE', 'FFFF', 'GGGG', 'HHHH', 'IIII', 'JJJJ'];
  model!: string;
}
