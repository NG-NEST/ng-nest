import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XSize } from '@ng-nest/ui/core';
import { XFindComponent } from '@ng-nest/ui/find';
import { XRadioComponent } from '@ng-nest/ui/radio';

@Component({
  selector: 'ex-size',
  standalone: true,
  imports: [FormsModule, XFindComponent, XRadioComponent],
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class ExSizeComponent {
  radioData = ['big', 'large', 'medium', 'small', 'mini'];
  size: XSize = 'medium';
  model = [
    { id: 1, label: '姓名1' },
    { id: 2, label: '姓名2' }
  ];
}
