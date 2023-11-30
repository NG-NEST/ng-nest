import { Component } from '@angular/core';
import { XInputComponent } from '@ng-nest/ui/input';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [XInputComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {}
