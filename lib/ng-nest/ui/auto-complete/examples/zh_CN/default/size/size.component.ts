import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XAutoCompleteComponent } from '@ng-nest/ui/auto-complete';
import type { XSize } from '@ng-nest/ui/core';
import { XColComponent, XRowComponent } from '@ng-nest/ui/layout';
import { XRadioComponent } from '@ng-nest/ui/radio';

@Component({
  selector: 'ex-size',
  imports: [FormsModule, XRadioComponent, XRowComponent, XColComponent, XAutoCompleteComponent],
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class ExSizeComponent {
  radioData = signal(['big', 'large', 'medium', 'small', 'mini']);
  size = signal<XSize>('medium');
  data = signal(['AAAA', 'AAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE', 'FFFF', 'GGGG', 'HHHH', 'IIII', 'JJJJ']);
}
