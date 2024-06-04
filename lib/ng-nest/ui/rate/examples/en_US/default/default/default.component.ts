import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XRateComponent } from '@ng-nest/ui/rate';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [FormsModule, XRateComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  model = signal(3);
}
