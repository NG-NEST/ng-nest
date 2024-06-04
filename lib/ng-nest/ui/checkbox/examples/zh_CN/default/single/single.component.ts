import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XCheckboxComponent } from '@ng-nest/ui/checkbox';

@Component({
  selector: 'ex-single',
  standalone: true,
  imports: [FormsModule, XCheckboxComponent],
  templateUrl: './single.component.html'
})
export class ExSingleComponent {
  data = signal(['启用']);
  model = signal(true);

  change(value: boolean) {
    console.log(value);
  }
}
