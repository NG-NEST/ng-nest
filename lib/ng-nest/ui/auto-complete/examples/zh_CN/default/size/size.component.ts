import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XAutoCompleteComponent, XAutoCompleteNode } from '@ng-nest/ui/auto-complete';
import { XData, XSize } from '@ng-nest/ui/core';
import { XColComponent, XRowComponent } from '@ng-nest/ui/layout';
import { XRadioComponent } from '@ng-nest/ui/radio';

@Component({
  selector: 'ex-size',
  standalone: true,
  imports: [FormsModule, XRadioComponent, XRowComponent, XColComponent, XAutoCompleteComponent],
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class ExSizeComponent {
  radioData = ['big', 'large', 'medium', 'small', 'mini'];
  size: XSize = 'medium';
  data: XData<XAutoCompleteNode> = [
    'AAAA',
    'AAA',
    'BBBB',
    'CCCC',
    'DDDD',
    'EEEE',
    'FFFF',
    'GGGG',
    'HHHH',
    'IIII',
    'JJJJ'
  ];
}
