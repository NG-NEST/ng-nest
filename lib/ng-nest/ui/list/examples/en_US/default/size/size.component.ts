import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XSize } from '@ng-nest/ui/core';
import { XRadioModule } from '@ng-nest/ui/radio';
import { XListComponent } from '@ng-nest/ui/list';

@Component({
  selector: 'ex-size',
  standalone: true,
  imports: [FormsModule, XListComponent, XRadioModule],
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class ExSizeComponent {
  radioData = ['big', 'large', 'medium', 'small', 'mini'];
  size: XSize = 'medium';

  data = ['AAAA', 'BBBB', { label: 'CCCC', leaf: true }, 'DDDD'];
}
