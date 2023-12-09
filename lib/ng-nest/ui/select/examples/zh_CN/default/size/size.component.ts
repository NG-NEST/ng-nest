import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XData, XSize } from '@ng-nest/ui/core';
import { XRadioComponent } from '@ng-nest/ui/radio';
import { XSelectComponent, XSelectNode } from '@ng-nest/ui/select';

@Component({
  selector: 'ex-size',
  standalone: true,
  imports: [FormsModule, XSelectComponent, XRadioComponent],
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class ExSizeComponent {
  radioData = ['big', 'large', 'medium', 'small', 'mini'];
  size: XSize = 'medium';
  data: XData<XSelectNode> = ['AAAA', 'AAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE', 'FFFF', 'GGGG', 'HHHH', 'IIII', 'JJJJ'];
}
