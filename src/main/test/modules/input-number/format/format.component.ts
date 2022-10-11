import { Component } from '@angular/core';
import { XNumber } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-format',
  templateUrl: './format.component.html',
  styleUrls: ['./format.component.scss']
})
export class ExFormatComponent {
  formatterDollar = (value: number): XNumber => `$ ${value}`;
  formatterPercent = (value: number): XNumber => `${value} %`;
}
