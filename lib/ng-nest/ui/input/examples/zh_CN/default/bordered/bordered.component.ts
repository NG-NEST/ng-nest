import { Component } from '@angular/core';
import { XInputComponent } from '@ng-nest/ui/input';

@Component({
  selector: 'ex-bordered',
  standalone: true,
  imports: [XInputComponent],
  templateUrl: './bordered.component.html',
  styleUrls: ['./bordered.component.scss']
})
export class ExBorderedComponent {}
