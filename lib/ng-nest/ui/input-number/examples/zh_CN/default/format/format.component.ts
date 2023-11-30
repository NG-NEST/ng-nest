import { Component } from '@angular/core';
import { XNumber } from '@ng-nest/ui/core';
import { XInputNumberComponent } from '@ng-nest/ui/input-number';

@Component({
  selector: 'ex-format',
  standalone: true,
  imports: [XInputNumberComponent],
  templateUrl: './format.component.html',
  styleUrls: ['./format.component.scss']
})
export class ExFormatComponent {
  formatterDollar = (value: number): XNumber => `$ ${value}`;
  formatterPercent = (value: number): XNumber => `${value} %`;
}
