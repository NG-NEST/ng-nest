import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XCheckboxComponent, XCheckboxNode } from '@ng-nest/ui/checkbox';
import { XData } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-single',
  standalone: true,
  imports: [FormsModule, XCheckboxComponent],
  templateUrl: './single.component.html'
})
export class ExSingleComponent {
  data: XData<XCheckboxNode> = ['启用'];
  model = true;

  change(value: boolean) {
    console.log(value);
  }
}
