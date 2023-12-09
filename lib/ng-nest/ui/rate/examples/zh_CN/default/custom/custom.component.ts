import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XRateComponent } from '@ng-nest/ui/rate';

@Component({
  selector: 'ex-custom',
  standalone: true,
  imports: [FormsModule, XRateComponent, XIconComponent],
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class ExCustomComponent {
  model = 3.5;
}
