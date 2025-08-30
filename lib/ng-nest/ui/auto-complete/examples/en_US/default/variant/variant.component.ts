import { Component, signal } from '@angular/core';
import { XAutoCompleteComponent } from '@ng-nest/ui/auto-complete';

@Component({
  selector: 'ex-variant',
  imports: [XAutoCompleteComponent],
  templateUrl: './variant.component.html',
  styleUrls: ['./variant.component.scss']
})
export class ExVariantComponent {
  data = signal(['AAAA', 'AAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE', 'FFFF', 'GGGG', 'HHHH', 'IIII', 'JJJJ']);
}
