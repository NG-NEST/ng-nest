import { Component, signal } from '@angular/core';
import { XSelectComponent } from '@ng-nest/ui/select';

@Component({
  selector: 'ex-variant',
  imports: [XSelectComponent],
  templateUrl: './variant.component.html',
  styleUrls: ['./variant.component.scss']
})
export class ExVariantComponent {
  data = signal(['AAAA', 'AAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE', 'FFFF', 'GGGG', 'HHHH', 'IIII', 'JJJJ']);
}
