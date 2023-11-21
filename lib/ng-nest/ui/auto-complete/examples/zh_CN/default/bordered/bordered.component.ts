import { Component } from '@angular/core';
import { XAutoCompleteComponent, XAutoCompleteNode } from '@ng-nest/ui/auto-complete';
import { XData } from '@ng-nest/ui/core';
import { XColComponent, XRowComponent } from '@ng-nest/ui/layout';

@Component({
  selector: 'ex-bordered',
  standalone: true,
  imports: [XRowComponent, XColComponent, XAutoCompleteComponent],
  templateUrl: './bordered.component.html',
  styleUrls: ['./bordered.component.scss']
})
export class ExBorderedComponent {
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
