import { Component } from '@angular/core';
import { XInputNumberComponent } from '@ng-nest/ui/input-number';

@Component({
  selector: 'ex-precision',
  standalone: true,
  imports: [XInputNumberComponent],
  templateUrl: './precision.component.html'
})
export class ExPrecisionComponent {}
