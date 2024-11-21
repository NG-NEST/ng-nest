import { Component, signal } from '@angular/core';
import { XSelectComponent } from '@ng-nest/ui/select';

@Component({
  selector: 'ex-bordered',
  imports: [XSelectComponent],
  templateUrl: './bordered.component.html',
  styleUrls: ['./bordered.component.scss']
})
export class ExBorderedComponent {
  data = signal(['AAAA', 'AAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE', 'FFFF', 'GGGG', 'HHHH', 'IIII', 'JJJJ']);
}
