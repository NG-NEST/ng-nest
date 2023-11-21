import { Component } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';

@Component({
  selector: 'ex-icon',
  standalone: true,
  imports: [XButtonComponent],
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class ExIconComponent {}
