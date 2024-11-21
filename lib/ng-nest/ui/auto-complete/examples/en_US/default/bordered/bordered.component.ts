import { Component, signal } from '@angular/core';
import { XAutoCompleteComponent } from '@ng-nest/ui/auto-complete';
import { XColComponent, XRowComponent } from '@ng-nest/ui/layout';

@Component({
  selector: 'ex-bordered',
  imports: [XRowComponent, XColComponent, XAutoCompleteComponent],
  templateUrl: './bordered.component.html',
  styleUrls: ['./bordered.component.scss']
})
export class ExBorderedComponent {
  data = signal(['AAAA', 'AAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE', 'FFFF', 'GGGG', 'HHHH', 'IIII', 'JJJJ']);
}
