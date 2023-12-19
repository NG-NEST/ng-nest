import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XSize } from '@ng-nest/ui/core';
import { XInputNumberComponent } from '@ng-nest/ui/input-number';
import { XListComponent } from '@ng-nest/ui/list';
import { XRadioComponent } from '@ng-nest/ui/radio';

@Component({
  selector: 'ex-scroll',
  standalone: true,
  imports: [FormsModule, XListComponent, XRadioComponent, XInputNumberComponent],
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.scss']
})
export class ExScrollComponent {
  radioData = ['big', 'large', 'medium', 'small', 'mini'];
  size: XSize = 'medium';

  visible = false;

  scrollHeight = 250;
  data = Array.from({ length: 1000 }).map((_, index) => `item ${index + 1}`);
}
