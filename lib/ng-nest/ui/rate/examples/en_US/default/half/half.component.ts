import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XRateComponent } from '@ng-nest/ui/rate';

@Component({
  selector: 'ex-half',
  standalone: true,
  imports: [FormsModule, XRateComponent],
  templateUrl: './half.component.html',
  styleUrls: ['./half.component.scss']
})
export class ExHalfComponent {
  model = signal(3.5);
}
