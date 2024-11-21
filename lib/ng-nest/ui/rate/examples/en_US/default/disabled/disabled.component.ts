import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XRateComponent } from '@ng-nest/ui/rate';

@Component({
  selector: 'ex-disabled',
  imports: [FormsModule, XRateComponent],
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.scss']
})
export class ExDisabledComponent {
  model = signal(3);
}
