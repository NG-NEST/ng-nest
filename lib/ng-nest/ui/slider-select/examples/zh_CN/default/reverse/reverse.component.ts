import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XSliderSelectComponent } from '@ng-nest/ui/slider-select';

@Component({
  selector: 'ex-reverse',
  standalone: true,
  imports: [FormsModule, XSliderSelectComponent],
  templateUrl: './reverse.component.html',
  styleUrls: ['./reverse.component.scss']
})
export class ExReverseComponent {
  model1 = 60;
}
