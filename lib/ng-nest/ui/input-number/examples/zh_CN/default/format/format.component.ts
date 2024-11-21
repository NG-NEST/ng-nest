import { Component, signal } from '@angular/core';
import { XNumber } from '@ng-nest/ui/core';
import { XInputNumberComponent } from '@ng-nest/ui/input-number';

@Component({
  selector: 'ex-format',
  imports: [XInputNumberComponent],
  templateUrl: './format.component.html',
  styleUrls: ['./format.component.scss']
})
export class ExFormatComponent {
  formatterDollar = signal((value: number): XNumber => `$ ${value}`);
  formatterPercent = signal((value: number): XNumber => `${value} %`);
}
