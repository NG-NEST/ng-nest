import { Component } from '@angular/core';
import { XInputNumberComponent } from '@ng-nest/ui/input-number';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [XInputNumberComponent],
  templateUrl: './default.component.html'
})
export class ExDefaultComponent {}
