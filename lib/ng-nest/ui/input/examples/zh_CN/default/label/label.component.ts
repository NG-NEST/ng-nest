import { Component } from '@angular/core';
import { XInputComponent } from '@ng-nest/ui/input';

@Component({
  selector: 'ex-label',
  standalone: true,
  imports: [XInputComponent],
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class ExLabelComponent {}
