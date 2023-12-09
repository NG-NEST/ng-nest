import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XSize } from '@ng-nest/ui/core';
import { XRadioComponent } from '@ng-nest/ui/radio';
import { XSwitchComponent } from '@ng-nest/ui/switch';

@Component({
  selector: 'ex-size',
  standalone: true,
  imports: [FormsModule, XSwitchComponent, XRadioComponent],
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class ExSizeComponent {
  radioData = ['big', 'large', 'medium', 'small', 'mini'];
  size: XSize = 'medium';
}
