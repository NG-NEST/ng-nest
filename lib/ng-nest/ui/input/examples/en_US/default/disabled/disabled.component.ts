import { Component } from '@angular/core';

@Component({
  selector: 'ex-disabled',
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.scss']
})
export class ExDisabledComponent {
  model = 'input disabled';
  modelClearable = 'the clear button is not display in the disabled state';

}
