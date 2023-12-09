import { Component } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XResultComponent } from '@ng-nest/ui/result';

@Component({
  selector: 'ex-warning',
  standalone: true,
  imports: [XButtonComponent, XResultComponent],
  templateUrl: './warning.component.html'
})
export class ExWarningComponent {}
