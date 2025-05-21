import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XNumber } from '@ng-nest/ui/core';
import { XInputNumberComponent } from '@ng-nest/ui/input-number';

@Component({
  selector: 'ex-format',
  standalone: true,
  imports: [XInputNumberComponent, FormsModule],
  templateUrl: './format.component.html',
  styleUrls: ['./format.component.scss']
})
export class ExFormatComponent {
  model1 = signal(null);
  model2 = signal(null);

  formatterDollar = signal((value: number): XNumber => (value ? `$ ${value}` : ''));
  formatterPercent = signal((value: number): XNumber => (value ? `${value} %` : ''));

  change(value: number) {
    console.log(value);
  }
}
