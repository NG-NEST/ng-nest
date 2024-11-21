import { Component } from '@angular/core';
import { XInputNumberComponent } from '@ng-nest/ui/input-number';

@Component({
  selector: 'ex-bordered',
  imports: [XInputNumberComponent],
  templateUrl: './bordered.component.html',
  styleUrls: ['./bordered.component.scss']
})
export class ExBorderedComponent {}
