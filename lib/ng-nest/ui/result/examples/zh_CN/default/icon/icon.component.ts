import { Component } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XResultComponent } from '@ng-nest/ui/result';

@Component({
  selector: 'ex-icon',
  standalone: true,
  imports: [XButtonComponent, XResultComponent],
  templateUrl: './icon.component.html'
})
export class ExIconComponent {}
