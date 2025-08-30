import { Component, signal } from '@angular/core';
import { XCascadeComponent } from '@ng-nest/ui/cascade';

@Component({
  selector: 'ex-variant',
  imports: [XCascadeComponent],
  templateUrl: './variant.component.html',
  styleUrls: ['./variant.component.scss']
})
export class ExVariantComponent {
  data = signal(['AAAA', 'AAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE', 'FFFF', 'GGGG', 'HHHH', 'IIII', 'JJJJ']);
}
