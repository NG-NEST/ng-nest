import { Component } from '@angular/core';
import { XCheckboxNode } from '@ng-nest/ui/checkbox';
import { XData } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-single',
  templateUrl: './single.component.html'
})
export class ExSingleComponent {
  data: XData<XCheckboxNode> = ['启用'];
  model = [];

  change(value: boolean) {
    console.log(value);
  }
}
