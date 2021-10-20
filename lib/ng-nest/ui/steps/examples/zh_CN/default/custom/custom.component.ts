import { Component } from '@angular/core';

@Component({
  selector: 'ex-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.html']
})
export class ExCustomComponent {
  activatedIndex = 1;
  data: string[] = ['步骤 1', '步骤 2', '步骤 3'];
}
