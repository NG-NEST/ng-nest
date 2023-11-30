import { Component } from '@angular/core';
import { XInputComponent } from '@ng-nest/ui/input';

@Component({
  selector: 'ex-icon',
  standalone: true,
  imports: [XInputComponent],
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class ExIconComponent {}
